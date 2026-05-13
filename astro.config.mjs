// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://umemoto.pages.dev', // 正しいURLに変更必要
  integrations: [icon()],
});
