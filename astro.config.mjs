import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import vercel from '@astrojs/vercel/serverless';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://flame.rajdeepm.xyz",
  integrations: [starlight({
    title: 'Flamewolf Docs',
    logo: { src: './src/assets/favicon.svg' },
    social: {
      github: 'https://github.com/rustdevbtw/flamewolf'
    },
  editLink: {
    baseUrl: 'https://github.com/rustdevbtw/flamedocs/edit/master/',
  },
    sidebar: [
      {
        label: "Docs",
        items: [
          {
            label: "Installation",
            link: "/install"
          },
          {
            label: "Privacy Explainer",
            link: "/privacy"
          }
        ]
      },
      {
        label: "Guides",
        items: [
          {
            label: "How to Contribute",
            link: "/guides/contributing"
          }
        ]
      }
    ],
    customCss: [
      "./src/fonts/Cas.css"
    ]
  }), sitemap()],
  output: "server",
  adapter: vercel()
});
