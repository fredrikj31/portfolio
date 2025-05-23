import { z } from "zod";

export const ResumeContentSchema = z.object({
  title: z.string(),
  subTitle: z.string(),
  description: z.any(),
  image: z.object({
    _type: z.literal("image"),
    alt: z.string(),
    asset: z.object({
      _ref: z.string(),
      _type: z.literal("reference"),
    }),
    height: z.number(),
    width: z.number(),
  }),
  links: z
    .object({
      link: z.string().optional(),
      text: z.string(),
    })
    .array(),
  workExperiences: z
    .object({
      name: z.string(),
      role: z.string(),
      description: z.any(),
    })
    .array(),
  projects: z
    .object({
      name: z.string(),
      type: z.string(),
      description: z.any(),
    })
    .array(),
  educations: z
    .object({
      type: z.string(),
      name: z.string(),
      fromDate: z.string(),
      toDate: z.string(),
    })
    .array(),
  interest: z.string().array(),
  languages: z
    .object({
      language: z.string(),
      level: z.string(),
    })
    .array(),
});
export type ResumeContent = z.infer<typeof ResumeContentSchema>;
