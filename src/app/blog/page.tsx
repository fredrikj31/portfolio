import { BlogPosts } from "@/src/components/home/BlogPosts";
import { listBlogPosts } from "@/src/services/hashnode";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Fredrik Johansen",
};

export default async function BlogPage() {
  const blogPosts = await listBlogPosts({ numberOfPosts: 10 });

  return (
    <>
      <div className="mt-10">
        <h1 className="text-4xl text-light-header dark:text-dark-header mb-3">
          Blog Posts📝
        </h1>
        <BlogPosts blogPosts={blogPosts} />
      </div>
    </>
  );
}
