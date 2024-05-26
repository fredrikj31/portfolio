import { z } from "zod";

export const SanityAboutSchema = z.object({
  _type: z.literal("about"),
});

export const SanityResumeSchema = z.object({
  _type: z.literal("resume"),
});

export const SanityTestimonialSchema = z.object({
  _type: z.literal("testimonial"),
});

export const SanityProjectSchema = z.object({
  _type: z.literal("project"),
  slug: z.object({
    _type: z.literal("slug"),
    current: z.string(),
  }),
});

export const SanityBlogSeriesSchema = z.object({
  _type: z.literal("blogSeries"),
  slug: z.object({
    _type: z.literal("slug"),
    current: z.string(),
  }),
});

export const SanityBlogPostSchema = z.object({
  _type: z.literal("blogPost"),
  slug: z.object({
    _type: z.literal("slug"),
    current: z.string(),
  }),
});

export const SanityWebhookSchema = z.discriminatedUnion("_type", [
  SanityAboutSchema,
  SanityResumeSchema,
  SanityTestimonialSchema,
  SanityProjectSchema,
  SanityBlogSeriesSchema,
  SanityBlogPostSchema,
]);
