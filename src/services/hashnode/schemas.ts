import { z } from "zod";

export const BlogPostTagSchema = z.object({
  name: z.string(),
});

export const BlogPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  publishedAt: z.string().datetime(),
  tags: BlogPostTagSchema.array(),
  readTimeInMinutes: z.number(),
  content: z.object({
    html: z.string(),
  }),
});
export type BlogPost = z.infer<typeof BlogPostSchema>;

export const SitemapBlogPostSchema = z.object({
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  slug: z.string(),
});
export type SitemapBlogPost = z.infer<typeof SitemapBlogPostSchema>;

export const BlogPostSeoSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  tags: BlogPostTagSchema.array(),
  readTimeInMinutes: z.number(),
  coverImage: z.object({
    url: z.string(),
  }),
  ogMetaData: z.object({
    image: z.string().optional(),
  }),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});
export type BlogPostSeo = z.infer<typeof BlogPostSeoSchema>;

export const BlogPostPreviewSchema = z.object({
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  slug: z.string(),
  title: z.string(),
  content: z.object({
    text: z.string(),
  }),
  readTimeInMinutes: z.number(),
});
export type BlogPostPreview = z.infer<typeof BlogPostPreviewSchema>;
