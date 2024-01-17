import { z } from "zod";

export const BlogPostSchema = z
  .object({
    title: z.string(),
    releaseDate: z.string(),
    readTimeInMinutes: z.number(),
    tags: z.string().array(),
    content: z.any(),
  })
  .nullable();
export type BlogPost = z.infer<typeof BlogPostSchema>;

export const BlogPostPreviewSchema = z.object({
  slug: z.string(),
  title: z.string(),
  releaseDate: z.string(),
  readTimeInMinutes: z.number(),
  previewText: z.string(),
  tags: z.string().array(),
});
export type BlogPostPreview = z.infer<typeof BlogPostPreviewSchema>;

export const BlogPostSeoSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    releaseDate: z.string(),
    tags: z.string().array(),
  })
  .nullable();
export type BlogPostSeo = z.infer<typeof BlogPostSeoSchema>;

export const BlogPostSitemapSchema = z.object({
  slug: z.string(),
  releaseDate: z.string(),
});
export type BlogPostSitemap = z.infer<typeof BlogPostSitemapSchema>;
