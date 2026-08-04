import { BlogPostPreview } from "@/src/components/common/BlogPostPreview";
import { blog } from "@/src/services/sanity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Fredrik Johansen",
};

export default async function BlogPage() {
  const blogPosts = await blog.listBlogPosts({});

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Thoughts on software development, tech trends, and personal growth.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((blogPost, index) => (
          <BlogPostPreview key={index} blogPostPreview={blogPost} />
        ))}
      </div>
    </div>
  );
}
