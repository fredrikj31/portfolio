import { Introduction } from "@/src/components/home/Introduction";
import { LinkHeader } from "@/src/components/home/LinkHeader";
import { blog, project, testimonial } from "@/src/services/sanity";
import { BlogPostPreview } from "@/src/components/common/BlogPostPreview";
import { Testimonial } from "@/src/components/common/Testimonial";
import { Metadata } from "next";
import { ProjectPreview } from "../components/common/ProjectPreview";
import { Button } from "@/shadcn/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Home - Fredrik Johansen`,
};

export default async function Home() {
  const latestBlogPosts = await blog.listBlogPosts({ limit: 3 });
  const projects = await project.listProjects({ limit: 3 });
  const testimonials = await testimonial.listTestimonials({ limit: 2 });

  return (
    <>
      <div className="py-4" />
      <Introduction />
      <div className="py-4" />
      <h2 className="text-2xl font-semibold mb-4">Latest Blog Posts</h2>
      <div className="flex flex-col gap-4 items-center">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
          {latestBlogPosts.map((blogPost, index) => (
            <BlogPostPreview key={index} blogPostPreview={blogPost} />
          ))}
        </div>
        <Button variant={"outline"} asChild>
          <Link href={"/blog"}>View All Posts</Link>
        </Button>
      </div>
      <div className="py-4" />
      <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
      <div className="flex flex-col gap-4 w-full items-center">
        <div className="flex flex-row gap-6 w-full">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} testimonial={testimonial} />
          ))}
        </div>
        <Button variant={"outline"} asChild>
          <Link href={"/testimonials"}>View All Testimonials</Link>
        </Button>
      </div>
      <div className="py-4" />
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      <div className="flex flex-col gap-4 items-center">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
          {projects.map((project, index) => (
            <ProjectPreview key={index} projectPreview={project} />
          ))}
        </div>
        <Button variant={"outline"} asChild>
          <Link href={"/blog"}>View Projects</Link>
        </Button>
      </div>
    </>
  );
}
