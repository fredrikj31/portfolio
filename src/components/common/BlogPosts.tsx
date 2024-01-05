import { BlogPostPreview } from "@/src/services/sanity/schemas";
import { DateTime } from "luxon";
import Link from "next/link";

interface BlogPostsProps {
  blogPosts: BlogPostPreview[];
}

export const BlogPosts = ({ blogPosts }: BlogPostsProps) => {
  return (
    <div className="flex flex-col gap-5">
      {blogPosts.map((blogPost, index) => {
        const releasedDate = DateTime.fromFormat(blogPost.releaseDate, "yyyy-MM-dd").toFormat("LLL dd, yyyy");

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
            <p className="text-light-text dark:text-dark-text max-h-32 line-clamp-3">{blogPost.previewText}</p>
            {blogPost.tags.length > 0 && (
              <div className="flex flex-row gap-2 mt-1">
                {blogPost.tags.map((blogTag, index) => {
                  return (
                    <Link
                      href={`/blog/tag/${blogTag
                        .toLowerCase()
                        .replaceAll(/google/g, "") // Special case with "google"
                        .trim()
                        .replaceAll(" ", "-")}`}
                      key={index}
                      className="text-xs px-2 py-1 bg-dark-background dark:bg-light-background dark:text-dark-background rounded-md text-light-background"
                    >
                      {blogTag}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
