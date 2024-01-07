import { SanityClient } from "next-sanity";
import { Testimonial, TestimonialSchema } from "./schemas";

export interface ListTestimonialsOptions {
  limit?: number;
}

export const listTestimonials = async (client: SanityClient, opts: ListTestimonialsOptions): Promise<Testimonial[]> => {
  const testimonials = await client.fetch(`
    *[_type == 'testimonial']${opts.limit ? `[0..${opts.limit - 1}]` : ""}
  `);

  const parsedTestimonials = TestimonialSchema.array().parse(testimonials);
  return parsedTestimonials;
};
