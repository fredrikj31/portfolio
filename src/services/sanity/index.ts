import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { listBlogPosts, ListBlogPostsOptions } from "./handlers/blog/listBlogPosts";
import { listBlogPostsByTag, ListBlogPostsByTagOptions } from "./handlers/blog/listBlogPostsByTag";
import { getBlogPostSeo, GetBlogPostSeoOptions } from "./handlers/blog/getBlogPostSeo";

import { getBlogPost, GetBlogPostOptions } from "./handlers/blog/getBlogPost";
import { listBlogPostsForSitemap } from "./handlers/blog/listBlogPostsForSitemap";
import { listTestimonials, ListTestimonialsOptions } from "./handlers/testimonial/listTestimonials";
import { getAboutContent } from "./handlers/about/getAboutContent";
import { listBlogPostsBySeries, ListBlogPostsBySeries } from "./handlers/blog/listBlogPostsBySeries";
import { getResumeContent } from "./handlers/resume/getResumeContent";
import { listProjects, ListProjectsOptions } from "./handlers/project/listProjects";
import { getProjectSeo, GetProjectSeoOptions } from "./handlers/project/getProjectSeo";
import { getProject, GetProjectOptions } from "./handlers/project/getProject";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2022-03-25",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export const sanityImageUrl = (source: string) => {
  return builder.image(source);
};

export const blog = {
  listBlogPosts: async (options: ListBlogPostsOptions) => {
    return await listBlogPosts(client, options);
  },

  listBlogPostsByTag: async (options: ListBlogPostsByTagOptions) => {
    return await listBlogPostsByTag(client, options);
  },

  listBlogPostsBySeries: async (options: ListBlogPostsBySeries) => {
    return await listBlogPostsBySeries(client, options);
  },

  getBlogPostSeo: async (options: GetBlogPostSeoOptions) => {
    return await getBlogPostSeo(client, options);
  },

  getBlogPost: async (options: GetBlogPostOptions) => {
    return await getBlogPost(client, options);
  },

  listBlogPostSitemap: async () => {
    return await listBlogPostsForSitemap(client);
  },
};

export const testimonial = {
  listTestimonials: async (options: ListTestimonialsOptions) => {
    return await listTestimonials(client, options);
  },
};

export const about = {
  getAboutContent: async () => {
    return await getAboutContent(client);
  },
};

export const resume = {
  getResumeContent: async () => {
    return await getResumeContent(client);
  },
};

export const project = {
  listProjects: async (options: ListProjectsOptions) => {
    return await listProjects(client, options);
  },
  getProjectSeo: async (options: GetProjectSeoOptions) => {
    return await getProjectSeo(client, options);
  },
  getProject: async (options: GetProjectOptions) => {
    return await getProject(client, options);
  },
};
