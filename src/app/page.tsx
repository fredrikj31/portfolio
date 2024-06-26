import { Introduction } from "@/src/components/home/Introduction";
import { LinkHeader } from "@/src/components/home/LinkHeader";
import { blog, project, testimonial } from "@/src/services/sanity";
import { BlogPostPreview } from "@/src/components/common/BlogPostPreview";
import { Testimonial } from "@/src/components/common/Testimonial";
import { Metadata } from "next";
import { ProjectPreview } from "../components/common/ProjectPreview";

export const metadata: Metadata = {
  title: `Home - Fredrik Johansen`,
};

export default async function Home() {
  const latestBlogPosts = await blog.listBlogPosts({ limit: 3 });
  const projects = await project.listProjects({ limit: 3 });
  const testimonials = await testimonial.listTestimonials({ limit: 2 });

  return (
    <>
      <Introduction />
      <div className="py-4" />
      <LinkHeader text="Latest Blog Posts" emoji="📝" link="/blog" />
      <div className="flex flex-col gap-5">
        {latestBlogPosts.map((blogPost, index) => (
          <BlogPostPreview key={index} blogPostPreview={blogPost} />
        ))}
      </div>
      <div className="py-4" />
      <LinkHeader text="Testimonials" emoji="💬" link="/testimonials" />
      <div className="flex flex-col gap-5">
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index} testimonial={testimonial} />
        ))}
      </div>
      <div className="py-4" />
      <LinkHeader text="Portfolio" emoji="🧰" link="/portfolio" />
      <div className="flex flex-col gap-5">
        {projects.map((project, index) => (
          <ProjectPreview key={index} projectPreview={project} />
        ))}
      </div>
    </>
  );
}
