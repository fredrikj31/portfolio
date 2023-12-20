import { DateTime } from "luxon";
import React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { parseHTML } from "@/app/utils/htmlParser";

// Highlight JS
hljs.configure({
  classPrefix: "lang",
});

// LaTeX

async function getData(slug: string) {
  const res = await fetch("https://gql.hashnode.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          publication(host: "fredrikj31.hashnode.dev") {
            post(slug: "${slug}") {
              slug
              title
              subtitle
      				publishedAt
      				tags {name}
      				readTimeInMinutes
              content {
                html
              }
            }
          }
        }
      `,
    }),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data } = await getData(params.slug);
  const parsedHTML = parseHTML(data.publication.post.content.html);

  return (
    <>
      <div className="flex flex-col mb-5 mt-3">
        <h1 className="text-4xl text-light-header dark:text-dark-header">
          {data.publication.post.title}
        </h1>
        <div className="flex flex-row text-light-text dark:text-dark-text">
          <p>
            {DateTime.fromISO(data.publication.post.publishedAt).toFormat(
              "LLLL dd, yyyy"
            )}
          </p>
          <span className="mx-5">&bull;</span>
          <p>{data.publication.post.readTimeInMinutes} min</p>
        </div>
      </div>
      <div>{parsedHTML}</div>
      <div className="flex flex-row gap-3">
        {data.publication.post.tags.map(
          (tag: { name: string }, index: number) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-dark-background dark:bg-light-background dark:text-dark-background rounded-md text-light-background"
            >
              {tag.name}
            </span>
          )
        )}
      </div>
    </>
  );
}
