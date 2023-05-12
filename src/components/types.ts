export type SiteData = {
  title: string;
  description: string;
  children?: any;
};

export type Article = {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  description: string;
  guid: string;
  guidUrl?: string;
  image?: string;
  content?: string;
};
