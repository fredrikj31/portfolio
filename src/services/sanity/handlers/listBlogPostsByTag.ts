import { SanityClient } from "next-sanity";
import { BlogPostPreview, BlogPostPreviewSchema } from "../schemas";

export interface ListBlogPostsByTagOptions {
  tag: string;
  limit: number;
}

export const listBlogPostsByTag = async (
  client: SanityClient,
  opts: ListBlogPostsByTagOptions
): Promise<BlogPostPreview[]> => {
  const posts = await client.fetch(`
    *[_type == 'blog' && '${opts.tag}' in tags] | order(released) {
      "slug": slug.current,
      title,
      "releaseDate": released,
      tags,
      "previewText": pt::text(content),
      "readTimeInMinutes": round(length(pt::text(content)) / 5 / 180)
    }[0..${opts.limit - 1}]
  `);

  const parsedPosts = BlogPostPreviewSchema.array().parse(posts);
  return parsedPosts;
};
