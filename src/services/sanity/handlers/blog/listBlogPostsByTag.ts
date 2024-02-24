import { SanityClient } from "next-sanity";
import { BlogPostPreview, BlogPostPreviewSchema } from "./schemas";

export interface ListBlogPostsByTagOptions {
  tag: string;
  limit?: number;
}

export const listBlogPostsByTag = async (
  client: SanityClient,
  opts: ListBlogPostsByTagOptions,
): Promise<BlogPostPreview[]> => {
  const posts = await client.fetch(`
    *[_type == 'blogPost' && '${opts.tag}' in tags] | order(published) {
      "slug": slug.current,
      title,
      "publishedAt": published,
      tags,
      "previewText": pt::text(content),
      "readTimeInMinutes": round(length(pt::text(content)) / 5 / 180)
    }${opts.limit ? `[0..${opts.limit - 1}]` : ""}
  `);

  const parsedPosts = BlogPostPreviewSchema.array().parse(posts);
  return parsedPosts;
};
