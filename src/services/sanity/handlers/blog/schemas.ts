import { z } from "zod";

export const BlogSeriesInformationSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  posts: z.object({ slug: z.string() }).array(),
});
export type BlogSeriesInformation = z.infer<typeof BlogSeriesInformationSchema>;

export const BlogPostSchema = z
  .object({
    title: z.string(),
    publishedAt: z.string(),
    readTimeInMinutes: z.number(),
    tags: z.string().array(),
    content: z.any(),
    series: BlogSeriesInformationSchema.nullable(),
  })
  .nullable();
export type BlogPost = z.infer<typeof BlogPostSchema>;

export const BlogPostPreviewSchema = z.object({
  slug: z.string(),
  title: z.string(),
  publishedAt: z.string(),
  readTimeInMinutes: z.number(),
  previewText: z.string(),
  tags: z.string().array().nullable(),
});
export type BlogPostPreview = z.infer<typeof BlogPostPreviewSchema>;

export const BlogSeriesSchema = BlogSeriesInformationSchema.extend({
  posts: BlogPostPreviewSchema.array(),
});
export type BlogSeries = z.infer<typeof BlogSeriesSchema>;

export const BlogPostSeoSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string(),
    modifiedAt: z.string().nullable(),
    tags: z.string().array(),
  })
  .nullable();
export type BlogPostSeo = z.infer<typeof BlogPostSeoSchema>;

export const BlogPostSitemapSchema = z.object({
  slug: z.string(),
  publishedAt: z.string(),
  modifiedAt: z.string().nullable(),
});
export type BlogPostSitemap = z.infer<typeof BlogPostSitemapSchema>;
