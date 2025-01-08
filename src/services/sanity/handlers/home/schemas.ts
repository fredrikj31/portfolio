import { z } from "zod";
import { ButtonSchema } from "../../types";
import { BlogPostPreviewSchema } from "../blog/schemas";
import { TestimonialSchema } from "../testimonial/schemas";
import { ProjectSchema } from "../project/schemas";

export const HomeContentSchema = z.object({
  header: z.string(),
  subheader: z.string(),
  buttons: ButtonSchema.array(),
  blogPosts: BlogPostPreviewSchema.array(),
  testimonials: TestimonialSchema.array(),
  projects: ProjectSchema.array(),
});
export type HomeContent = z.infer<typeof HomeContentSchema>;

export const HomeSeoSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.string().array(),
});
export type HomeSeo = z.infer<typeof HomeSeoSchema>;
