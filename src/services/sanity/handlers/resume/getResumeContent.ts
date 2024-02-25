import { SanityClient } from "next-sanity";
import { ResumeContent, ResumeContentSchema } from "./schemas";

export const getResumeContent = async (client: SanityClient): Promise<ResumeContent> => {
  const resumeContent = await client.fetch(`
    *[_type == 'resume'][0]
  `);

  const parsedResumeContent = ResumeContentSchema.parse(resumeContent);
  return parsedResumeContent;
};
