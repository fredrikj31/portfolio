import { resume } from "@/src/services/sanity";
import { richTextComponents } from "@/src/utils/richTextComponents";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Resume - Fredrik Johansen`,
};

export default async function ResumePage() {
  const resumeContent = await resume.getResumeContent();

  return (
    <>
      <div className="mt-5" />
      <PortableText
        value={resumeContent.content}
        components={richTextComponents}
        onMissingComponent={(message, options) => {
          console.error(message, {
            type: options.type,
            nodeType: options.nodeType,
          });
        }}
      />
    </>
  );
}
