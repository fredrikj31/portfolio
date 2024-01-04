import { SanityClient } from "next-sanity";
import { BlogPostSeo, BlogPostSeoSchema } from "../schemas";

export interface GetBlogPostSeoOptions {
  slug: string;
}

export const getBlogPostSeo = async (
  client: SanityClient,
  opts: GetBlogPostSeoOptions
): Promise<BlogPostSeo> => {
  const post = await client.fetch(`
    *[_type == 'blog' && slug.current == '${opts.slug}'] | order(released) {
      title,
      description,
      "releaseDate": released,
      tags,
    }[0]
  `);

  const parsedPost = BlogPostSeoSchema.parse(post);
  return parsedPost;
};
