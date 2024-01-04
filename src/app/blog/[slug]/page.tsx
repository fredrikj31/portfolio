import { DateTime } from "luxon";
import React from "react";
import { Metadata } from "next";
import { getBlogPost, getBlogPostSeo } from "@/src/services/sanity";
import { PortableText } from "@portabletext/react";
import { richTextComponents } from "@/src/utils/richTextComponents";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blogPostSeo = await getBlogPostSeo({ slug: params.slug });

  return {
    title: blogPostSeo.title,
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
      publishedTime: blogPostSeo.releaseDate,
      tags: blogPostSeo.tags,
      url: `/blog/${params.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const blogPost = await getBlogPost({ slug: params.slug });

  return (
    <>
      <div className="flex flex-col mb-5 mt-3">
        <h1 className="text-4xl text-light-header dark:text-dark-header">
          {blogPost.title}
        </h1>
        <div className="flex flex-row text-light-text dark:text-dark-text">
          <p>
            {DateTime.fromFormat(blogPost.releaseDate, "yyyy-MM-dd").toFormat(
              "LLLL dd, yyyy"
            )}
          </p>
          <span className="mx-5">&bull;</span>
          <p>{blogPost.readTimeInMinutes} min</p>
        </div>
      </div>
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
      <div className="flex flex-row gap-3">
        {blogPost.tags.map((tag, index: number) => (
          <span
            key={index}
            className="text-xs px-2 py-1 bg-dark-background dark:bg-light-background dark:text-dark-background rounded-md text-light-background"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}
