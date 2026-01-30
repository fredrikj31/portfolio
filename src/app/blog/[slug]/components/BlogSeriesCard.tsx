import { Button } from "@/shadcn/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { BlogSeriesInformation } from "@/src/services/sanity/handlers/blog/schemas";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BlogSeriesCardProps {
  currentSlug: string;
  series: BlogSeriesInformation;
}
export const BlogSeriesCard = ({ currentSlug, series }: BlogSeriesCardProps) => {
  const currentPostIndex = series.posts.findIndex((item) => item.slug === currentSlug);
  const nextPost = currentPostIndex !== series.posts.length - 1 ? series.posts[currentPostIndex + 1] : null; // Null if you're already looking at the last blog post in the series

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Part of the &quot;{series.title}&quot; series</CardTitle>
        <CardDescription>
          This post is part {currentPostIndex + 1} of {series.posts.length} in this series.
        </CardDescription>
      </CardHeader>
      <div className="p-6 pt-0 flex justify-between items-center">
        <Button asChild variant="outline">
          <Link href={`/blog/series/${series.slug}`}>View full series</Link>
        </Button>
        {nextPost && (
          <Button asChild className="ml-auto flex items-end">
            <Link href={nextPost.slug} className="flex flex-row items-center!">
              Next in series
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </Card>
  );
};
