import { SanityClient } from "next-sanity";
import { Project, ProjectSchema } from "./schemas";

export interface GetProjectSeoOptions {
  slug: string;
}

export const getProjectSeo = async (
  client: SanityClient,
  opts: GetProjectSeoOptions,
): Promise<Omit<Project, "content" | "slug">> => {
  const post = await client.fetch(`
    *[_type == 'project' && slug.current == '${opts.slug}'] {
      title,
      description,
      techstack,
    }[0]
  `);

  const parsedPost = ProjectSchema.omit({ content: true, slug: true }).parse(post);
  return parsedPost;
};
