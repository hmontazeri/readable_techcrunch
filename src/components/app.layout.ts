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
    </head>
    <body class="font-sans max-w-screen-lg mx-auto p-4 antialiased">
      ${props.children}
    </body>
  </html>
`;

// <link href="https://cdn.tailwindcss.com" rel="preload" as="script" />
// <script src="https://cdn.tailwindcss.com"></script>
