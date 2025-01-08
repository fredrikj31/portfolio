import { z } from "zod";

export const ButtonSchema = z.object({
  type: z.union([z.literal("primary"), z.literal("secondary")]),
  text: z.string(),
  link: z.string().url(),
  isExternal: z.boolean(),
});
export type Button = z.infer<typeof ButtonSchema>;
