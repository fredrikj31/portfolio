import { Badge } from "@/shadcn/components/ui/badge";
import { Card, CardContent } from "@/shadcn/components/ui/card";
import { BlogPostPreview } from "@/src/components/common/BlogPostPreview";
import { blog } from "@/src/services/sanity";
import { FileText } from "lucide-react";
import { DateTime } from "luxon";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  title: "Blog - Fredrik Johansen",
};

export default async function BlogPostSeriesPage({ params }: Props) {
  const slug = (await params).slug;
  const seriesBlogPosts = await blog.listBlogPostsBySeries({
    series: slug,
  });

  if (!seriesBlogPosts) {
    notFound();
  }

  return (
    <>
      <div className="max-w-5xl mx-auto py-8 md:px-6 gap-8 flex flex-col">
        {/* Series Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Series: &quot;{seriesBlogPosts.title}&quot;</h1>
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">{seriesBlogPosts.description}</p>
        </div>

        <div className="flex flex-col gap-6">
          {seriesBlogPosts.posts
            .toSorted(
              (a, b) =>
                DateTime.fromISO(b.publishedAt).toUnixInteger() - DateTime.fromISO(a.publishedAt).toUnixInteger(),
            )
            .map((blogPost, index) => (
              <Card key={index} className="transition-colors hover:bg-muted/50">
                <CardContent className="p-6">
                  <Link href={`/blog/${blogPost.slug}`} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-muted-foreground">
                          Part {seriesBlogPosts.posts.length - index}
                        </div>
                        <h2 className="text-xl font-semibold">{blogPost.title}</h2>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{DateTime.fromFormat(blogPost.publishedAt, "yyyy-MM-dd").toFormat("LLL dd, yyyy")}</span>
                        <span>•</span>
                        <span>{blogPost.readTimeInMinutes} min</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground truncate whitespace-pre-wrap line-clamp-3">
                      {blogPost.previewText}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {blogPost.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
