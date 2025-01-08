import { SanityClient } from "next-sanity";
import { HomeSeo, HomeSeoSchema } from "./schemas";

export const getHomeSeo = async (client: SanityClient): Promise<HomeSeo> => {
  const homeSeo = await client.fetch(`
    *[_type == 'home'][0]{
      title,
      description,
      keywords
    }
  `);

  const parsedHomeSeo = HomeSeoSchema.parse(homeSeo);
  return parsedHomeSeo;
};
