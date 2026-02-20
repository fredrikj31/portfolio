import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { BlogPostPreview } from "@/src/components/common/BlogPostPreview";
import { blog } from "@/src/services/sanity";
import { ChevronRight } from "lucide-react";
import { DateTime } from "luxon";
import { Metadata } from "next";
import Link from "next/link";

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
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                <Link href={`/blog/${blogPost.slug}`} className="hover:underline">
                  {blogPost.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 truncate line-clamp-2 whitespace-pre-wrap">
                {blogPost.previewText}
              </p>
              <div className="flex flex-wrap gap-2">
                {(blogPost.tags ?? []).map((tag) => (
                  <span key={tag} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center mt-auto">
              <div className="text-sm text-muted-foreground">
                {DateTime.fromFormat(blogPost.publishedAt, "yyyy-MM-dd").toFormat("LLL dd, yyyy")} ·{" "}
                {blogPost.readTimeInMinutes} min read
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/blog/${blogPost.slug}`}>
                  Read more <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
