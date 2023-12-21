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
  updatedAt: z.string().datetime().nullable(),
  slug: z.string(),
});
export type SitemapBlogPost = z.infer<typeof SitemapBlogPostSchema>;
