import { SanityClient } from "next-sanity";
import { HomeContent, HomeContentSchema } from "./schemas";

export const getHomeContent = async (client: SanityClient): Promise<HomeContent> => {
  const homeContent = await client.fetch(`
    *[_type == 'home'][0]{
      header,
      subheader,
      buttons,
      blogPosts[]->{
        "slug": slug.current,
        title,
        "publishedAt": published,
        tags,
        "previewText": pt::text(content),
        "readTimeInMinutes": round(length(pt::text(content)) / 5 / 180)
      },
      testimonials[]->,
      projects[]->{
        "slug": slug.current,
        title,
        description,
        techstack,
      },
    }
  `);

  const parsedHomeContent = HomeContentSchema.parse(homeContent);
  return parsedHomeContent;
};
