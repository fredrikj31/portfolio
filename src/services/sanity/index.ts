import { createClient } from "next-sanity";
import { listBlogPosts as sanityGetBlogPosts } from "./handlers/listBlogPosts";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2022-03-25",
  useCdn: process.env.NODE_ENV === "production",
});

export const listBlogPosts = () => sanityGetBlogPosts(client);
