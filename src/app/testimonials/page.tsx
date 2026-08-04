import { Testimonial } from "@/src/components/common/Testimonial";
import { testimonial } from "@/src/services/sanity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials - Fredrik Johansen",
};

export default async function BlogPage() {
  const testimonials = await testimonial.listTestimonials({});

  return (
    <>
      <div className="mt-10">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">Testimonials</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </>
  );
}
