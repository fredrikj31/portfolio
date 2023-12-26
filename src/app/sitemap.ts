import { MetadataRoute } from "next";
import { getSitemapBlogPosts } from "@/src/services/hashnode";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getSitemapBlogPosts();

  const blogPostsSiteMap: MetadataRoute.Sitemap = blogPosts.map((blogPost) => ({
    url: `https://fredrikjohansen.dev/blog/${blogPost.slug}`,
    lastModified: blogPost.updatedAt || blogPost.publishedAt,
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