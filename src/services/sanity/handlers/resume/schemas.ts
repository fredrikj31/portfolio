import { z } from "zod";

export const ResumeContentSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.any(),
});
export type ResumeContent = z.infer<typeof ResumeContentSchema>;
