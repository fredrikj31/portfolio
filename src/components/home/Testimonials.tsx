import { Testimonial as TestimonialOptions } from "@/src/services/sanity/handlers/testimonial/schemas";
import { Testimonial } from "@/src/components/common/Testimonial";

interface TestimonialsProps {
  testimonials: TestimonialOptions[];
}

export const Testimonials = ({ testimonials }: TestimonialsProps) => {
  return (
    <>
      {testimonials.map((testimonial, index) => (
        <Testimonial key={index} testimonial={testimonial} />
      ))}
    </>
  );
};
