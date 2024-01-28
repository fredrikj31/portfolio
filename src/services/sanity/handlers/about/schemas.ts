import { z } from "zod";

export const AboutContentSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.any(),
});
export type AboutContent = z.infer<typeof AboutContentSchema>;
