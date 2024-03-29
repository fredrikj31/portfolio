import { SanityClient } from "next-sanity";
import { BlogPostPreview, BlogPostPreviewSchema } from "./schemas";

export interface ListBlogPostsOptions {
  limit?: number;
}

export const listBlogPosts = async (client: SanityClient, opts: ListBlogPostsOptions): Promise<BlogPostPreview[]> => {
  const posts = await client.fetch(
    `
      *[_type == 'blogPost'] | order(published desc) {
        "slug": slug.current,
        title,
        "publishedAt": published,
        tags,
        "previewText": pt::text(content),
        "readTimeInMinutes": round(length(pt::text(content)) / 5 / 180)
      }${opts.limit ? `[0..${opts.limit - 1}]` : ""}
    `,
  );

  const parsedPosts = BlogPostPreviewSchema.array().parse(posts);
  return parsedPosts;
};
