import { Badge } from "@/shadcn/components/ui/badge";
import { Card, CardContent } from "@/shadcn/components/ui/card";
import { BlogPostPreview as BlogPostPreviewType } from "@/src/services/sanity/handlers/blog/schemas";
import { ArrowRight } from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";

interface BlogPostPreviewProps {
  blogPostPreview: BlogPostPreviewType;
}

export const BlogPostPreview = ({ blogPostPreview }: BlogPostPreviewProps) => {
  const publishedAt = DateTime.fromFormat(blogPostPreview.publishedAt, "yyyy-MM-dd").toFormat("LLL dd, yyyy");
  return (
    <Card key={blogPostPreview.slug}>
      <CardContent className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold">{blogPostPreview.title}</h3>
        <p className="text-sm text-muted-foreground font-mono">
          <ins dateTime={publishedAt} className="no-underline">
            {publishedAt}
          </ins>{" "}
          · {blogPostPreview.readTimeInMinutes} min read
        </p>
        {(blogPostPreview.tags ?? []).length > 0 && (
          <div className="flex flex-row flex-wrap gap-1">
            {(blogPostPreview.tags ?? []).map((tag) => (
              <Link key={tag} href={`/blog/tag/${tag.toLowerCase().trim().replaceAll(" ", "-")}`}>
                <Badge variant="secondary">{tag}</Badge>
              </Link>
            ))}
          </div>
        )}
        <Link
          href={`/blog/${blogPostPreview.slug}`}
          className="flex flex-row gap-1 text-link hover:underline text-sm items-end"
        >
          Read more <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
};
