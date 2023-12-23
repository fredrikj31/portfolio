import { HASHNODE_API_HOST, HASHNODE_BLOG_DOMAIN } from "..";
import { BlogPostSeo, BlogPostSeoSchema } from "../schemas";

interface GetBlogPostSeoOptions {
  slug: string;
}
export const getBlogPostSeo = async ({
  slug,
}: GetBlogPostSeoOptions): Promise<BlogPostSeo> => {
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
              tags {
                name
              }
              readTimeInMinutes
              coverImage {
                url
              }
              ogMetaData {
                image
              }
              seo {
                title
                description
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
    return BlogPostSeoSchema.parse(data.publication.post);
  } catch (error) {
    throw new Error("Failed to parse response data", { cause: error });
  }
};
