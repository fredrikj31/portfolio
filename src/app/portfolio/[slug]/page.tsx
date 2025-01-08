import React from "react";
import { Metadata } from "next";
import { project } from "@/src/services/sanity";
import { PortableText } from "@portabletext/react";
import { richTextComponents } from "@/src/utils/richTextComponents";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const projectSeo = await project.getProjectSeo({ slug });

  if (!projectSeo) {
    return {
      title: "Portfolio - Fredrik Johansen",
    };
  }

  const openGraphImageUrlSearchParams = new URLSearchParams();
  openGraphImageUrlSearchParams.append("title", projectSeo.title);
  for (const tag of projectSeo.techstack) {
    openGraphImageUrlSearchParams.append("tag", tag);
  }
  const openGraphImageUrl = new URL(
    `${process.env.HOST}/api/portfolio/project/og?${openGraphImageUrlSearchParams.toString()}`,
  );

  return {
    title: `${projectSeo.title} - Fredrik Johansen`,
    category: "project",
    keywords: projectSeo.techstack,
    metadataBase: new URL("https://fredrikjohansen.dev"),
    publisher: "Fredrik Johansen",
    authors: { name: "Fredrik Johansen", url: "/" },
    description: projectSeo.description,
    openGraph: {
      type: "article",
      authors: "Fredrik Johansen",
      description: projectSeo.description,
      title: projectSeo.title,
      tags: projectSeo.techstack,
      images: openGraphImageUrl,
      url: `/portfolio/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const slug = (await params).slug;
  const projectPost = await project.getProject({ slug });

  if (!projectPost) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col mb-5 mt-3">
        <h1 className="text-4xl text-light-header dark:text-dark-header">{projectPost.title}</h1>
      </div>
      <PortableText
        value={projectPost.content}
        components={richTextComponents}
        onMissingComponent={(message, options) => {
          console.error(message, {
            type: options.type,
            nodeType: options.nodeType,
          });
        }}
      />
      {/* Techstack */}
      <div className="flex flex-col gap-2 mt-5">
        <span className="text-2xl text-light-header dark:text-dark-header">Techstack:</span>
        <div className="flex flex-row gap-3">
          {projectPost.techstack.map((tech, index: number) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-dark-background dark:bg-light-background dark:text-dark-background rounded-md text-light-background"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
