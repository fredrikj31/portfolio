import { BlogPostPreview as BlogPostPreviewType } from "@/src/services/sanity/handlers/blog/schemas";
import { DateTime } from "luxon";
import Link from "next/link";

interface BlogPostPreviewProps {
  blogPostPreview: BlogPostPreviewType;
}

export const BlogPostPreview = ({ blogPostPreview }: BlogPostPreviewProps) => {
  const releasedDate = DateTime.fromFormat(blogPostPreview.releaseDate, "yyyy-MM-dd").toFormat("LLL dd, yyyy");
  return (
    <div>
      <h3 className="text-xl text-light-header dark:text-dark-header">
        <Link href={`/blog/${blogPostPreview.slug}`}>{blogPostPreview.title}</Link>
      </h3>
      <h4 className="text-base text-light-text dark:text-dark-text mb-1">
        <ins dateTime={releasedDate} className="no-underline">
          {releasedDate}
        </ins>{" "}
        ⋅ {blogPostPreview.readTimeInMinutes} min
      </h4>
      <p className="text-light-text dark:text-dark-text max-h-32 line-clamp-3">{blogPostPreview.previewText}</p>
      {blogPostPreview.tags.length > 0 && (
        <div className="flex flex-row gap-2 mt-1">
          {blogPostPreview.tags.map((blogTag, index) => {
            return (
              <Link
                href={`/blog/tag/${blogTag.toLowerCase().trim().replaceAll(" ", "-")}`}
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
};
