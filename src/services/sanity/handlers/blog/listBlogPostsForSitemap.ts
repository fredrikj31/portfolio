import { SanityClient } from "next-sanity";
import { BlogPostSitemap, BlogPostSitemapSchema } from "./schemas";

export const listBlogPostsForSitemap = async (client: SanityClient): Promise<BlogPostSitemap[]> => {
  const posts = await client.fetch(`
    *[_type == 'blogPost'] | order(published) {
      "slug": slug.current,
      "publishedAt": published,
    }
  `);

  const parsedPosts = BlogPostSitemapSchema.array().parse(posts);
  return parsedPosts;
};
