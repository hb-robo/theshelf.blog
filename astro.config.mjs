// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import db from '@astrojs/db';
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://theshelf.blog',
  trailingSlash: "never",

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [db(), mdx()]
});