import { SanityClient } from "next-sanity";
import { Project, ProjectSchema } from "./schemas";

export interface ListProjectsOptions {
  limit?: number;
}

export const listProjects = async (
  client: SanityClient,
  opts: ListProjectsOptions,
): Promise<Omit<Project, "content">[]> => {
  const projects = await client.fetch(
    `
      *[_type == 'project'] {
        "slug": slug.current,
        title,
        description,
        "readTimeInMinutes": round(length(pt::text(content)) / 5 / 180),
        techstack,
      }${opts.limit ? `[0..${opts.limit - 1}]` : ""}
    `,
  );

  return ProjectSchema.omit({ content: true }).array().parse(projects);
};
