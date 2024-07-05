import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import vercel from '@astrojs/vercel/serverless';
import sitemap from "@astrojs/sitemap";
import frappe from "@catppuccin/vscode/themes/frappe.json" with { type: "json" };

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
    components: {
      // Relative path to the custom component.
      Head: './src/components/Head.astro',
    },
    customCss: [
      "./src/fonts/Cas.css"
    ],
    lastUpdated: true,
    expressiveCode: {
      themes: [frappe]
    }
  }), sitemap()],
  output: "hybrid",
  adapter: vercel()
});
