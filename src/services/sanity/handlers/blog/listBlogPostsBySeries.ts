import { SanityClient } from "next-sanity";
import { BlogSeries, BlogSeriesSchema } from "./schemas";

export interface ListBlogPostsBySeries {
  series: string;
  limit?: number;
}

export const listBlogPostsBySeries = async (client: SanityClient, opts: ListBlogPostsBySeries): Promise<BlogSeries> => {
  const post = await client.fetch(`
    *[_type == 'blogSeries' && slug.current == '${opts.series}'] {
      title,
      description,
      "slug": slug.current,
      "posts": posts[]-> {
        "slug": slug.current,
        title,
        "releaseDate": released,
        tags,
        "previewText": pt::text(content),
        "readTimeInMinutes": round(length(pt::text(content)) / 5 / 180)
      }
    }[0]
  `);

  const parsedSeries = BlogSeriesSchema.parse(post);
  return parsedSeries;
};
