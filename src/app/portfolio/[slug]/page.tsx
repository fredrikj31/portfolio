import React from "react";
import { Metadata } from "next";
import { project } from "@/src/services/sanity";
import { PortableText } from "@portabletext/react";
import { richTextComponents } from "@/src/utils/richTextComponents";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Layers } from "lucide-react";
import Link from "next/link";

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
    <article className="max-w-5xl mx-auto py-8 md:px-6">
      <Link
        href="/portfolio"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Portfolio
      </Link>

      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{projectPost.title}</h1>
        {projectPost.readTimeInMinutes && (
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              {projectPost.readTimeInMinutes} min read
            </div>
          </div>
        )}
        {projectPost.techstack.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Layers className="mr-2 h-4 w-4" />
              <span>Tech Stack:</span>
            </div>
            <div className="flex flex-row gap-1">
              {projectPost.techstack.map((tech, index: number) => (
                <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </header>
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
    </article>
  );
}
