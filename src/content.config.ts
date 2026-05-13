// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// カテゴリ候補（フィルターUIから参照するため export）
export const CATEGORIES = [
  'web site',
  'illust',
  'logo',
  'ui design',
  'animation',
  'graphic',
] as const;

export type Category = (typeof CATEGORIES)[number];

const projects = defineCollection({
  // src/content/projects/ 配下の .md ファイルを全て読み込む
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),

  schema: ({ image }) => z.object({
    // プロジェクト名
    title: z.string(),

    
    description: z.string().optional(),

    // 制作年月（"2024-10" 形式）
    date: z.string(),

    // 種別：client = Client Work / self = Self Project
    type: z.enum(['client', 'self']),

    // 使用技術（配列）
    tech: z.array(z.string()),

    // カテゴリ
    categories: z.array(z.enum(CATEGORIES)).min(1),

    // サムネイル画像（src/assets/ 配下を想定）
    thumbnail: image(),

    // Live Demo の URL（任意）
    liveUrl: z.string().url().optional(),

    // 並び順（小さいほど先頭、任意）
    order: z.number().optional(),
  }),
});

// 「projects」という名前でコレクションを公開
export const collections = { projects };