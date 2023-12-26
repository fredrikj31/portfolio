import { HASHNODE_API_HOST, HASHNODE_BLOG_DOMAIN } from "..";
import { BlogPostPreview, BlogPostPreviewSchema } from "../schemas";

interface ListBlogPostsByTagOptions {
  tagSlug: string;
  numberOfPosts: number;
}

export const listBlogPostsByTag = async ({
  tagSlug,
  numberOfPosts,
}: ListBlogPostsByTagOptions): Promise<BlogPostPreview[]> => {
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
              posts(
                first: ${numberOfPosts}, 
                after: "${continueToken}"
                filter: {
                	tagSlugs: "${tagSlug}"
              	}
              ) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                edges {
                  node {
                    slug
                    title
                    tags {name}
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
