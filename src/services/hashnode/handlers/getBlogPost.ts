import { HASHNODE_API_HOST, HASHNODE_BLOG_DOMAIN } from "..";
import { BlogPost, BlogPostSchema } from "../schemas";

interface GetBlogPostOptions {
  slug: string;
}
export const getBlogPost = async ({
  slug,
}: GetBlogPostOptions): Promise<BlogPost> => {
  const res = await fetch(HASHNODE_API_HOST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          publication(host: "${HASHNODE_BLOG_DOMAIN}") {
            post(slug: "${slug}") {
              slug
              title
              subtitle
      				publishedAt
      				tags {name}
      				readTimeInMinutes
              content {
                html
              }
            }
          }
        }
      `,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data", { cause: res.statusText });
  }

  const { data } = await res.json();
  try {
    return BlogPostSchema.parse(data.publication.post);
  } catch (error) {
    throw new Error("Failed to parse response data", { cause: error });
  }
};
