import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { listBlogPosts, ListBlogPostsOptions } from "./handlers/listBlogPosts";
import { listBlogPostsByTag, ListBlogPostsByTagOptions } from "./handlers/listBlogPostsByTag";
import { getBlogPostSeo, GetBlogPostSeoOptions } from "./handlers/getBlogPostSeo";

import { getBlogPost, GetBlogPostOptions } from "./handlers/getBlogPost";
import { listBlogPostsForSitemap } from "./handlers/listBlogPostsForSitemap";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2022-03-25",
  useCdn: process.env.NODE_ENV === "production",
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
