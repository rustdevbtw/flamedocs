import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import deno from '@astrojs/deno';
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
    sidebar: [{
      label: 'Guides',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'Installation Guide',
        link: '/guides/install/'
      },
      
      {
        label: 'Privacy Explainer',
        link: '/guides/privacy/'
      }
      ]
    }]
  }), sitemap()],
  output: "server",
  adapter: deno()
});
