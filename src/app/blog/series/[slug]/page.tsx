import { BlogPostPreview } from "@/src/components/common/BlogPostPreview";
import { blog } from "@/src/services/sanity";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export const metadata: Metadata = {
  title: "Blog - Fredrik Johansen",
};

export default async function BlogPostSeriesPage({ params }: Props) {
  const seriesBlogPosts = await blog.listBlogPostsBySeries({
    series: params.slug,
  });

  if (!seriesBlogPosts) {
    notFound();
  }

  return (
    <>
      <div className="mt-10">
        <div className="flex flex-col gap-2 mb-3">
          <h1 className="text-4xl text-light-header dark:text-dark-header">
            Series: &quot;{seriesBlogPosts.title}&quot;📑
          </h1>
          <p className="text-base text-light-text dark:text-dark-text">{seriesBlogPosts.description}</p>
        </div>
        <div className="flex flex-col gap-5">
          {seriesBlogPosts.posts.map((blogPost, index) => (
            <BlogPostPreview key={index} blogPostPreview={blogPost} />
          ))}
        </div>
      </div>
    </>
  );
}
