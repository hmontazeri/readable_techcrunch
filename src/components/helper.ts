import { XMLParser } from "fast-xml-parser";
import DomParser from "dom-parser";
// @ts-ignore
import { htmlToText } from "html-to-text";
import { Article } from "./types";
import { Context } from "hono";
import { env } from "hono/adapter";
import { Redis } from "@upstash/redis/cloudflare";

function parseXmlToJson(xml: string): any {
  const parser = new XMLParser();
  const feedJSON = parser.parse(xml);
  return feedJSON;
}

export async function loadAndParseTechCrunchFeedToArticle(c: Context) {
  const feedXML = await fetch("https://techcrunch.com/feed/");
  const feedText = await feedXML.text();
  const feedJSON = parseXmlToJson(feedText);
  const articles = await Promise.all(
    feedJSON.rss.channel.item.map(async (item: any) => {
      // check if article exists in db
      const { REDIS_URL } = env<{ REDIS_URL: string }>(c);
      const { REDIS_TOKEN } = env<{ REDIS_TOKEN: string }>(c);
      const redis = new Redis({
        url: REDIS_URL,
        token: REDIS_TOKEN,
      });
      let article = (await redis.get(item.guid.split("?p=").pop())) as
        | Article
        | undefined;
      if (article) {
        return article;
      }
      // get article html

      const articleHtml = await LoadRequestRawHtml(item.link);
      const domParser = new DomParser();
      const articleDom = domParser.parseFromString(articleHtml);
      const articleFeatureImage = articleDom
        .getElementsByClassName("article__featured-image")?.[0]
        ?.getAttribute("src");
      article = {
        title: htmlToText(item.title),
        link: item.link,
        pubDate: item.pubDate,
        creator: item["dc:creator"],
        description: htmlToText(item.description.replace(/<[^>]*>?/gm, "")),
        guid: item.guid.split("?p=").pop(),
        image: articleFeatureImage || "",
      };

      await redis.set(article.guid, JSON.stringify(article));
      return article;
    })
  );

  return articles;
}

export async function LoadRequestRawHtml(url: string) {
  let data = await fetch(url);
  let text = await data.text();

  return text;
}

export async function loadHtmlFromGuidAndGetContentHtml(
  c: Context,
  guid: string
) {
  const { REDIS_URL } = env<{ REDIS_URL: string }>(c);
  const { REDIS_TOKEN } = env<{ REDIS_TOKEN: string }>(c);
  const redis = new Redis({
    url: REDIS_URL,
    token: REDIS_TOKEN,
  });
  const article = (await redis.get(guid)) as Article | undefined;

  if (!article) {
    return "";
  }

  const articleHtml = await LoadRequestRawHtml(article.link);
  const domParser = new DomParser();
  const articleDom = domParser.parseFromString(articleHtml);
  const articleFeatureImage = articleDom
    .getElementsByClassName("article__featured-image")?.[0]
    ?.getAttribute("src");
  const title =
    articleDom.getElementsByClassName("article__title")?.[0].innerHTML;
  const formattedTitle = htmlToText(title);
  let contentDom = articleDom.getElementsByClassName("article-content");
  let content =
    articleDom.getElementsByClassName("article-content")?.[0].innerHTML;
  // remove all script footer and empty p tags
  content = content?.replace(/<script[^>]*>.*<\/script>/gm, "");
  content = content?.replace(/<footer[^>]*>.*<\/footer>/gm, "");
  content = content?.replace(/<p><\/p>/gm, "");
  // replace width and height 100% all images from content and all style attributes from all tags from content
  content = content?.replace(/width="100%"/gm, "");
  content = content?.replace(/height="100%"/gm, "");
  content = content?.replace(/style="[^"]*"/gm, "");

  //replace all <p>&nbsp;</p>
  content = content?.replace(/<p>&nbsp;<\/p>/gm, "");
  return {
    title: formattedTitle,
    content,
    pubDate: article.pubDate,
    creator: article.creator,
    image: articleFeatureImage,
  };
}
