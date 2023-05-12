import { Layout } from "./app.layout";
import { html } from "hono/html";
import { SiteData } from "./types";

export const ArticlePage = (props: {
  siteData: SiteData;
  article: {
    content: string | undefined;
    title: string;
    pubDate: string;
    creator: string;
    image: string | undefined | null;
  };
}) => {
  return (
    <Layout {...props.siteData}>
      <div class="flex flex-col space-y-4">
        <div class="header ">
          <a
            class="text-gray-600 hover:text-gray-900 transition-all duration-150 ease-in py-6"
            href="/">
            <div class="self-start text-xl font-semibold">
              A <i class="text-gray-600">readable</i> TechCrunch Feed
            </div>
          </a>

          <div class="flex flex-col space-y-2 lg:py-24 py-2">
            <h1 class="lg:text-5xl text-3xl font-semibold w-full lg:w-1/2 self-start">
              {props.article.title}
            </h1>
            <div class="py-4 flex flex-col lg:space-y-2">
              <small class="text-gray-600 text-sx uppercase ">
                {props.article.creator}
              </small>
              <small class="text-gray-400 text-sx">
                {new Date(props.article.pubDate).toLocaleDateString()}
              </small>
            </div>
          </div>
        </div>
        <img src={props.article.image} alt={props.article.title} />
        <div class="flex flex-col space-y-6 mx-auto lg:text-xl break-word items-center text-gray-800">
          {
            // @ts-ignore
            html(props.article.content)
          }
        </div>
        <div class="py-12">
          <a href="/">
            <button class="flex flex-row items-center space-x-2 hover:bg-gray-200 hover:text-gray-900 text-gray-600 py-2 px-4 rounded transition-all duration-150 ease-in">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              <span>Back</span>
            </button>
          </a>
        </div>
      </div>
    </Layout>
  );
};
