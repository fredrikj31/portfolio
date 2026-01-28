import { DateTime } from "luxon";
import React from "react";
import { Metadata } from "next";
import { blog } from "@/src/services/sanity";
import { PortableText } from "@portabletext/react";
import { richTextComponents } from "@/src/utils/richTextComponents";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, ChevronRight, Clock, Tag } from "lucide-react";
import { Badge } from "@/shadcn/components/ui/badge";
import { Button } from "@/shadcn/components/ui/button";
import { Separator } from "@/shadcn/components/ui/separator";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const blogPostSeo = await blog.getBlogPostSeo({ slug });

  if (!blogPostSeo) {
    return {
      title: "Blog - Fredrik Johansen",
    };
  }

  const openGraphImageUrlSearchParams = new URLSearchParams();
  openGraphImageUrlSearchParams.append("title", blogPostSeo.title);
  for (const tag of blogPostSeo.tags) {
    openGraphImageUrlSearchParams.append("tag", tag);
  }
  const openGraphImageUrl = new URL(`${process.env.HOST}/api/blog/post/og?${openGraphImageUrlSearchParams.toString()}`);

  return {
    title: `${blogPostSeo.title} - Fredrik Johansen`,
    category: "blog",
    keywords: blogPostSeo.tags,
    metadataBase: new URL("https://fredrikjohansen.dev"),
    publisher: "Fredrik Johansen",
    authors: { name: "Fredrik Johansen", url: "/" },
    description: blogPostSeo.description,
    openGraph: {
      type: "article",
      authors: "Fredrik Johansen",
      description: blogPostSeo.description,
      title: blogPostSeo.title,
      publishedTime: blogPostSeo.publishedAt,
      modifiedTime: blogPostSeo.modifiedAt || undefined,
      tags: blogPostSeo.tags,
      images: openGraphImageUrl,
      url: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const slug = (await params).slug;
  const blogPost = await blog.getBlogPost({ slug });

  if (!blogPost) {
    notFound();
  }

  return (
    <article className="max-w-5xl mx-auto py-8">
      <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all posts
      </Link>

      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">{blogPost.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {DateTime.fromFormat(blogPost.publishedAt, "yyyy-MM-dd").toFormat("LLL dd, yyyy")}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            {blogPost.readTimeInMinutes} min read
          </div>
        </div>
      </header>

      <PortableText
        value={blogPost.content}
        components={richTextComponents}
        onMissingComponent={(message, options) => {
          console.error(message, {
            type: options.type,
            nodeType: options.nodeType,
          });
        }}
      />

      <Separator className="my-8" />

      <footer>
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {blogPost.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <Button className="w-fit" asChild variant="outline">
            <Link href="/blog">Read more articles</Link>
          </Button>
        </div>

        <Separator className="my-8" />

        {blogPost.series && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Part of the &quot;{blogPost.series.title}&quot; series</CardTitle>
              <CardDescription>This post is part 1 of 4 in this series.</CardDescription>
            </CardHeader>
            <div className="p-6 pt-0 flex justify-between items-center">
              <Button asChild variant="outline">
                <Link href={`/blog/series/${blogPost.series.slug}`}>View full series</Link>
              </Button>
              {blogPost.series && (
                <Button asChild className="ml-auto flex items-end">
                  <Link href={`/blog/oof`} className="inline-flex items-center">
                    Next in series
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </Card>
        )}
      </footer>
    </article>
  );
}
