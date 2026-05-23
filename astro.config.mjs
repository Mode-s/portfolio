// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://mexcha.pages.dev', // 正しいURLに変更必要
  integrations: [icon()],
  trailingSlash: 'never',
  build: { format: 'file' },
});
