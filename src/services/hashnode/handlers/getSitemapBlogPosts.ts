import { HASHNODE_API_HOST, HASHNODE_BLOG_DOMAIN } from "..";
import { SitemapBlogPost } from "../schemas";

export const getSitemapBlogPosts = async (): Promise<SitemapBlogPost[]> => {
  const sitemapBlogPosts: SitemapBlogPost[] = [];
  let continueToken: string = "";

  do {
    const res: any = await fetch(HASHNODE_API_HOST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            publication(host: "${HASHNODE_BLOG_DOMAIN}") {
              posts(first: 20, after: "${continueToken}") {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                edges {
                  node {
                    publishedAt
                    updatedAt
                    slug
                  }
                }
              }
            }
          }
        `,
      }),
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    const { data } = await res.json();
    if (data.publication.posts.pageInfo.hasNextPage) {
      continueToken = data.publication.posts.pageInfo.endCursor;
    }

    for (const blogPost of data.publication.posts.edges) {
      const { node } = blogPost;
      sitemapBlogPosts.push({
        publishedAt: node.publishedAt,
        updatedAt: node.updatedAt,
        slug: node.slug,
      });
    }
  } while (continueToken);

  return sitemapBlogPosts;
};
