import { Layout } from "./app.layout";
import { Article } from "./helper";

export const HomePage = (props: {
  siteData: SiteData;
  articles: Article[];
}) => (
  <Layout {...props.siteData}>
    <h1 class="lg:text-5xl text-3xl lg:py-24 p-4 font-semibold lg:w-96 w-full">
      A <i class="text-gray-600">readable</i> TechCrunch feed
    </h1>
    <div class="grid lg:grid-cols-2 grid-cols-1 grid lg:gap-6 gap-3">
      {props.articles.map((article) => (
        <div class="rounded-xl hover:bg-gray-100 p-4 lg:px-6 cursor-pointer transition-all duration-150 ease-in">
          <a href={"article/" + article.guid} class="flex flex-col space-y-2">
            <p class="text-xl font-semibold">{article.title}</p>
            <p class="text-gray-500 text-sm">{article.description}</p>
            <small class="text-gray-400 text-sx">
              {new Date(article.pubDate).toLocaleDateString()}
            </small>
            <div class="text-gray-600 text-sx font-semibold uppercase pt-6 flex flex-row space-x-2 items-center text-sm">
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
            </div>
          </a>
        </div>
      ))}
    </div>
  </Layout>
);
