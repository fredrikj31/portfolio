import { BlogPostPreview } from "@/src/components/common/BlogPostPreview";
import { blog } from "@/src/services/sanity";

type Props = {
  params: { slug: string };
};

export default async function BlogPostTagsPage({ params }: Props) {
  const blogPosts = await blog.listBlogPostsByTag({
    tag: params.slug,
  });

  return (
    <>
      <div className="mt-10">
        <h1 className="text-4xl text-light-header dark:text-dark-header mb-3">
          Posts with tag &quot;{params.slug}&quot;📌
        </h1>
        <div className="flex flex-col gap-5">
          {blogPosts.map((blogPost, index) => (
            <BlogPostPreview key={index} blogPostPreview={blogPost} />
          ))}
        </div>
      </div>
    </>
  );
}
