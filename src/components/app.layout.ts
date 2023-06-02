import { html } from "hono/html";

interface SiteData {
  title: string;
  description: string;
  children?: any;
}

export const Layout = (props: SiteData) => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>${props.title}</title>
      <meta name="description" content="${props.description}" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/public/tailwind.css" rel="stylesheet" />
      <script
        async
        defer
        data-website-id="5f094925-14a4-41a7-94a2-fb118f2da5c0"
        src="https://umami.hmontazeri.me/umami.js"></script>
    </head>
    <body class="font-sans max-w-screen-lg mx-auto p-4 antialiased">
      ${props.children}
    </body>
  </html>
`;
