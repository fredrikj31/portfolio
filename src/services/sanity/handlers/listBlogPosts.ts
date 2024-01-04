import { SanityClient } from "next-sanity";

export const listBlogPosts = async (client: SanityClient) => {
  const posts = await client.fetch(`
    *[_type == 'blog'] | order(released) {
      ...,
      "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180)
    }
  `);
  console.log(posts);
};
