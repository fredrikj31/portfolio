import { MetadataRoute } from "next";
import { blog, project } from "@/src/services/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await blog.listBlogPostSitemap();
  const projects = await project.listProjects({});

  const blogPostsSiteMap: MetadataRoute.Sitemap = blogPosts.map((blogPost) => ({
    url: `https://fredrikjohansen.dev/blog/${blogPost.slug}`,
    lastModified: blogPost.modifiedAt || blogPost.publishedAt,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const projectsSiteMap: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `https://fredrikjohansen.dev/portfolio/${project.slug}`,
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
    {
      url: "https://fredrikjohansen.dev/testimonials",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    ...blogPostsSiteMap,
    ...projectsSiteMap,
  ];
}
