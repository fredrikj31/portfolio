import { SanityClient } from "next-sanity";
import { AboutContent, AboutContentSchema } from "./schemas";

export const getAboutContent = async (client: SanityClient): Promise<AboutContent> => {
  const aboutContent = await client.fetch(`
    *[_type == 'about'][0]
  `);

  const parsedAboutContent = AboutContentSchema.parse(aboutContent);
  return parsedAboutContent;
};
