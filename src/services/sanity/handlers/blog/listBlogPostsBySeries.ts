import { SanityClient } from "next-sanity";
import { BlogSeries, BlogSeriesSchema } from "./schemas";

export interface ListBlogPostsBySeries {
  series: string;
  limit?: number;
}

export const listBlogPostsBySeries = async (
  client: SanityClient,
  opts: ListBlogPostsBySeries,
): Promise<BlogSeries | null> => {
  const post = await client.fetch(`
    *[_type == 'blogSeries' && slug.current == '${opts.series}'] {
      title,
      description,
      "slug": slug.current,
      "posts": posts[]-> {
        "slug": slug.current,
        title,
        "publishedAt": published,
        tags,
        "previewText": pt::text(content),
        "readTimeInMinutes": round(length(pt::text(content)) / 5 / 180)
      }
    }[0]
  `);

  const parsedSeries = BlogSeriesSchema.nullable().parse(post);
  return parsedSeries;
};
