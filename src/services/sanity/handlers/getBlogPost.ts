import { SanityClient } from "next-sanity";
import { BlogPost, BlogPostSchema } from "../schemas";

export interface GetBlogPostOptions {
  slug: string;
}

export const getBlogPost = async (
  client: SanityClient,
  opts: GetBlogPostOptions
): Promise<BlogPost> => {
  const post = await client.fetch(`
    *[_type == 'blog' && slug.current == '${opts.slug}'] | order(released) {
      title,
      "releaseDate": released,
      "readTimeInMinutes": round(length(pt::text(content)) / 5 / 180),
      tags,
      content,
    }[0]
  `);

  const parsedPost = BlogPostSchema.parse(post);
  return parsedPost;
};
