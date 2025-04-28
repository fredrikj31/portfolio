import { SanityClient } from "next-sanity";
import { Project, ProjectSchema } from "./schemas";

export interface GetProjectOptions {
  slug: string;
}

export const getProject = async (client: SanityClient, opts: GetProjectOptions): Promise<Project> => {
  const project = await client.fetch(`
    *[_type == 'project' && slug.current == '${opts.slug}'] {
      "slug": slug.current,
      title,
      description,
      "readTimeInMinutes": round(length(pt::text(content)) / 5 / 180),
      techstack,
      content,
    }[0]
  `);

  return ProjectSchema.parse(project);
};
