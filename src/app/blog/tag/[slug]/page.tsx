import { BlogPostPreview } from "@/src/components/common/BlogPostPreview";
import { blog } from "@/src/services/sanity";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  title: `Blog - Fredrik Johansen`,
};

export default async function BlogPostTagsPage({ params }: Props) {
  const slug = (await params).slug;
  const blogPosts = await blog.listBlogPostsByTag({
    tag: slug,
  });

  return (
    <>
      <div className="mt-10">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">Tagged: &quot;{slug}&quot;</h1>
        <div className="flex flex-col gap-5">
          {blogPosts.map((blogPost, index) => (
            <BlogPostPreview key={index} blogPostPreview={blogPost} />
          ))}
        </div>
      </div>
    </>
  );
}
