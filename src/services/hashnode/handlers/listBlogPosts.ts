import { HASHNODE_API_HOST, HASHNODE_BLOG_DOMAIN } from "..";
import { BlogPostPreview, BlogPostPreviewSchema } from "../schemas";

interface ListBlogPostsOptions {
  numberOfPosts: number;
}

export const listBlogPosts = async ({
  numberOfPosts,
}: ListBlogPostsOptions): Promise<BlogPostPreview[]> => {
  const blogPosts: BlogPostPreview[] = [];
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
              posts(first: ${numberOfPosts}, after: "${continueToken}") {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                edges {
                  node {
                    slug
                    title,
                    content {text}
                    readTimeInMinutes
                    publishedAt
                    updatedAt
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
      const parsedBlogPost = BlogPostPreviewSchema.parse(node);
      blogPosts.push(parsedBlogPost);
    }
  } while (continueToken);

  return blogPosts;
};
