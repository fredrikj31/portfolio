import { Testimonial } from "@/src/services/sanity/handlers/testimonial/schemas";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials = ({ testimonials }: TestimonialsProps) => {
  return (
    <>
      {testimonials.map(({ author, company, position, testimonial }, index) => (
        <div key={index} className="flex flex-col gap-4">
          <blockquote className="flex flex-col">
            <p className="text-light-text dark:text-dark-text italic mb-2">“{testimonial}”</p>
            <footer className="flex flex-col">
              <cite className="text-light-text dark:text-dark-text not-italic">{author}</cite>
              <span className="text-light-text dark:text-dark-text">
                {position} - {company}
              </span>
            </footer>
          </blockquote>
        </div>
      ))}
    </>
  );
};
