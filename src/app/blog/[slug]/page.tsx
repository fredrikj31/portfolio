import { DateTime } from "luxon";
import React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { parseHTML } from "@/src/utils/htmlParser";
import { getBlogPost } from "@/src/services/hashnode";

// Highlight JS
hljs.configure({
  classPrefix: "lang",
});

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const blogPost = await getBlogPost({ slug: params.slug });
  const parsedHTML = parseHTML(blogPost.content.html);

  return (
    <>
      <div className="flex flex-col mb-5 mt-3">
        <h1 className="text-4xl text-light-header dark:text-dark-header">
          {blogPost.title}
        </h1>
        <div className="flex flex-row text-light-text dark:text-dark-text">
          <p>
            {DateTime.fromISO(blogPost.publishedAt).toFormat("LLLL dd, yyyy")}
          </p>
          <span className="mx-5">&bull;</span>
          <p>{blogPost.readTimeInMinutes} min</p>
        </div>
      </div>
      <div>{parsedHTML}</div>
      <div className="flex flex-row gap-3">
        {blogPost.tags.map((tag: { name: string }, index: number) => (
          <span
            key={index}
            className="text-xs px-2 py-1 bg-dark-background dark:bg-light-background dark:text-dark-background rounded-md text-light-background"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </>
  );
}
