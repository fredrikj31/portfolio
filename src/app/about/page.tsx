import { about } from "@/src/services/sanity";
import { richTextComponents } from "@/src/utils/richTextComponents";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `About - Fredrik Johansen`,
};

export default async function AboutPage() {
  const aboutContent = await about.getAboutContent();

  return (
    <div className="max-w-3xl mx-auto py-8 [&_p]:text-lg [&_li]:text-lg [&_blockquote]:text-lg">
      <PortableText
        value={aboutContent.content}
        components={richTextComponents}
        onMissingComponent={(message, options) => {
          console.error(message, {
            type: options.type,
            nodeType: options.nodeType,
          });
        }}
      />
    </div>
  );
}
