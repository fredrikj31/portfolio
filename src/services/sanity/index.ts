import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import {
  listBlogPosts as sanityListBlogPosts,
  ListBlogPostsOptions,
} from "./handlers/listBlogPosts";
import {
  listBlogPostsByTag as sanityListBlogPostsByTag,
  ListBlogPostsByTagOptions,
} from "./handlers/listBlogPostsByTag";
import {
  getBlogPostSeo as sanityGetBlogPostSeo,
  GetBlogPostSeoOptions,
} from "./handlers/getBlogPostSeo";

import {
  getBlogPost as sanityGetBlogPost,
  GetBlogPostOptions,
} from "./handlers/getBlogPost";
import { listBlogPostsForSitemap as sanityListBlogPostsForSitemap } from "./handlers/listBlogPostsForSitemap";

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

export const listBlogPosts = (opts: ListBlogPostsOptions) =>
  sanityListBlogPosts(client, opts);

export const listBlogPostsByTag = (opts: ListBlogPostsByTagOptions) =>
  sanityListBlogPostsByTag(client, opts);

export const getBlogPostSeo = (opts: GetBlogPostSeoOptions) =>
  sanityGetBlogPostSeo(client, opts);

export const getBlogPost = (opts: GetBlogPostOptions) =>
  sanityGetBlogPost(client, opts);

export const listBlogPostSitemap = () => sanityListBlogPostsForSitemap(client);
