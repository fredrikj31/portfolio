import { SanityClient } from "next-sanity";
import { BlogPost, BlogPostSchema } from "./schemas";

export interface GetBlogPostOptions {
  slug: string;
}

export const getBlogPost = async (client: SanityClient, opts: GetBlogPostOptions): Promise<BlogPost> => {
  const post = await client.fetch(`
    *[_type == 'blogPost' && slug.current == '${opts.slug}'] | order(released) {
      title,
      "releaseDate": released,
      "readTimeInMinutes": round(length(pt::text(content)) / 5 / 180),
      tags,
      content,
      "series": *[_type=='blogSeries' && references(^._id)]{ 
        title,
        description,
        "slug": slug.current
      }[0]
    }[0]
  `);

  const parsedPost = BlogPostSchema.parse(post);
  return parsedPost;
};
