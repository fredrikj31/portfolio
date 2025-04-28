import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  readTimeInMinutes: z.number().optional(),
  slug: z.string(),
  techstack: z.string().array(),
  content: z.any(),
});
export type Project = z.infer<typeof ProjectSchema>;
