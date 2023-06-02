import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import { env } from "hono/adapter";

import {
  loadAndParseTechCrunchFeedToArticle,
  loadHtmlFromGuidAndGetContentHtml,
} from "./components/helper";
import { HomePage } from "./components/home.layout";
import { ArticlePage } from "./components/article.layout";

const app = new Hono();

// serve static files
app.get("/public/*", serveStatic({ root: "./" }));

// index route
app.get("/", async (c) => {
  const articles = await loadAndParseTechCrunchFeedToArticle(c);
  const props = {
    siteData: {
      title: "A readable TechCrunch feed",
      description: "A readable TechCrunch feed",
    },
    articles,
  };

  return c.html(<HomePage {...props} />);
});

// article route
app.get("/article/:guid", async (c) => {
  const article = await loadHtmlFromGuidAndGetContentHtml(
    c,
    c.req.param("guid")
  );

  const props = {
    siteData: {
      title: article.title,
      description: article.content?.slice(0, 100) || "",
    },
    article,
  };

  return c.html(<ArticlePage {...props} />);
});

// export app
export default app;
