import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/favicon.ico", "/blog/sponsor"],
    },
    sitemap: "https://fredrikjohansen.dev/sitemap.xml",
  };
}
