import { SanityClient, stegaClean } from "next-sanity";
import { BlogPost, BlogPostSchema } from "./schemas";
import { draftMode } from "next/headers";

export interface GetBlogPostOptions {
  slug: string;
}

export const getBlogPost = async (client: SanityClient, opts: GetBlogPostOptions): Promise<BlogPost> => {
  const { isEnabled } = await draftMode();
  const post = await client.fetch(
    `*[_type == 'blogPost' && slug.current == '${opts.slug}'] | order(published) {
      title,
      "publishedAt": published,
      "readTimeInMinutes": round(length(pt::text(content)) / 5 / 180),
      tags,
      content,
      "series": *[_type=='blogSeries' && references(^._id)]{ 
        title,
        description,
        "slug": slug.current
      }[0]
    }[0]`,
    {},
    isEnabled
      ? {
          perspective: "previewDrafts",
          useCdn: false,
          stega: true,
        }
      : undefined,
  );

  const parsedPost = BlogPostSchema.parse(post);
  return parsedPost;
};
