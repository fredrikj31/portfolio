import { MetadataRoute } from "next";

const fetchBlogPosts = async () => {
  const blogPosts: { slug: string; publishedAt: string }[] = [];
  let continueToken: string = "";

  do {
    const res: any = await fetch("https://gql.hashnode.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            publication(host: "fredrikj31.hashnode.dev") {
              posts(first: 20, after: \"${continueToken}\") {
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
      blogPosts.push({
        publishedAt: node.updatedAt || node.publishedAt,
        slug: node.slug,
      });
    }
  } while (continueToken);

  return blogPosts;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await fetchBlogPosts();

  const blogPostsSiteMap: MetadataRoute.Sitemap = blogPosts.map((blogPost) => ({
    url: `https://fredrikjohansen.dev/blog/${blogPost.slug}`,
    lastModified: blogPost.publishedAt,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [
    {
      url: "https://fredrikjohansen.dev",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://fredrikjohansen.dev/about",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    {
      url: "https://fredrikjohansen.dev/portfolio",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    {
      url: "https://fredrikjohansen.dev/resume",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    {
      url: "https://fredrikjohansen.dev/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    ...blogPostsSiteMap,
  ];
}
