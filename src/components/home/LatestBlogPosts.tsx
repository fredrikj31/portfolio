import { BlogPostPreview } from "@/src/services/hashnode/schemas";
import { DateTime } from "luxon";
import Link from "next/link";

interface LatestBlogPostsProps {
  blogPosts: BlogPostPreview[];
}

export const LatestBlogPosts = ({ blogPosts }: LatestBlogPostsProps) => {
  return (
    <>
      <h2 className="text-3xl text-light-header dark:text-dark-header mb-3">
        Latest Blog Posts📝
      </h2>
      <div className="flex flex-col gap-5">
        {blogPosts.map((blogPost, index) => {
          const releasedDate = DateTime.fromISO(
            blogPost.updatedAt || blogPost.publishedAt
          ).toFormat("LLL dd, yyyy");

          return (
            <div key={index}>
              <h3 className="text-xl text-light-header dark:text-dark-header">
                <Link href={`/blog/${blogPost.slug}`}>{blogPost.title}</Link>
              </h3>
              <h4 className="text-base text-light-text dark:text-dark-text mb-1">
                <ins dateTime={releasedDate} className="no-underline">
                  {releasedDate}
                </ins>{" "}
                ⋅ {blogPost.readTimeInMinutes} min
              </h4>
              <p className="text-light-text dark:text-dark-text max-h-32 line-clamp-3">
                {blogPost.content.text}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};