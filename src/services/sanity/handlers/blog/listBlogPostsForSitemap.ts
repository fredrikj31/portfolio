import { SanityClient } from "next-sanity";
import { BlogPostSitemap, BlogPostSitemapSchema } from "./schemas";

export const listBlogPostsForSitemap = async (client: SanityClient): Promise<BlogPostSitemap[]> => {
  const posts = await client.fetch(`
    *[_type == 'blog'] | order(released) {
      "slug": slug.current,
      "releaseDate": released,
    }
  `);

  const parsedPosts = BlogPostSitemapSchema.array().parse(posts);
  return parsedPosts;
};
