import { z } from "zod";

export const TestimonialSchema = z.object({
  author: z.string(),
  position: z.string(),
  company: z.string(),
  testimonial: z.string(),
});
export type Testimonial = z.infer<typeof TestimonialSchema>;
