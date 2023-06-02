import { Layout } from "./app.layout";
import { Article, SiteData } from "./types";

export const HomePage = (props: {
  siteData: SiteData;
  articles: Article[];
}) => (
  <Layout {...props.siteData}>
    <h1 class="lg:text-5xl text-3xl lg:py-24 p-4 font-semibold lg:w-96 w-full">
      A <i class="text-gray-600">readable</i> TechCrunch feed
    </h1>
    <div class="grid grid-cols-1 lg:gap-6 gap-3">
      {props.articles.map((article: Article) => (
        <div class="rounded-xl hover:bg-gray-100 p-4 lg:px-6 transition-all duration-150 ease-in flex flex-col lg:flex-row lg:space-x-4 lg:space-y-0 space-y-2">
          <div class="lg:w-1/4 lg:h-full h-40 w-full">
            <img
              class="rounded object-cover h-full w-full bg-center"
              src={article.image}></img>
          </div>
          <div class="flex flex-col space-y-2 lg:w-3/4">
            <p class="text-xl font-semibold">{article.title}</p>
            <small class="text-gray-400 ">{article.creator}</small>
            <p class="text-gray-500 text-sm">{article.description}</p>
            <p class="text-xs">
              <small class="text-gray-400">
                {new Date(article.pubDate).toLocaleDateString()}
              </small>
            </p>
            <a
              href={"article/" + article.guid}
              class="text-gray-600 text-sx font-semibold uppercase pt-4 flex flex-row space-x-2 items-center text-sm hover:pl-1 transition-all ease-in duration-150">
              <span>Continue reading</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 inline-block ml-1">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  </Layout>
);
