import { BlogPostPreview } from "@/src/components/common/BlogPostPreview";
import { blog } from "@/src/services/sanity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Fredrik Johansen",
};

export default async function BlogPage() {
  const blogPosts = await blog.listBlogPosts({});

  return (
    <>
      <div className="mt-10">
        <h1 className="text-4xl text-light-header dark:text-dark-header mb-3">Blog Posts✒️</h1>
        <div className="flex flex-col gap-5">
          {blogPosts.map((blogPost, index) => (
            <BlogPostPreview key={index} blogPostPreview={blogPost} />
          ))}
        </div>
      </div>
    </>
  );
}
