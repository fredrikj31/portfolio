import { Testimonial as TestimonialOptions } from "@/src/services/sanity/handlers/testimonial/schemas";

interface TestimonialProps {
  testimonial: TestimonialOptions;
}

export const Testimonial = ({ testimonial: { author, company, position, testimonial } }: TestimonialProps) => {
  return (
    <div className="flex flex-col gap-4">
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
  );
};
