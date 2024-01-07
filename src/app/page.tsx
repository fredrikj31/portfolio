import { Introduction } from "@/src/components/home/Introduction";
import { BlogPosts } from "@/src/components/common/BlogPosts";
import { Testimonials } from "@/src/components/home/Testimonials";
import { Projects } from "@/src/components/home/Projects";
import { LinkHeader } from "@/src/components/home/LinkHeader";
import { blog, testimonial } from "../services/sanity";

export default async function Home() {
  const latestBlogPosts = await blog.listBlogPosts({ limit: 3 });
  const testimonials = await testimonial.listTestimonials({ limit: 2 });

  return (
    <>
      <Introduction />
      <div className="py-4" />
      <LinkHeader text="Latest Blog Posts" emoji="📝" link="/blog" />
      <BlogPosts blogPosts={latestBlogPosts} />
      <div className="py-4" />
      <LinkHeader text="Testimonials" emoji="💬" link="/testimonials" />
      <Testimonials testimonials={testimonials} />
      <div className="py-4" />
      <Projects />
    </>
  );
}
