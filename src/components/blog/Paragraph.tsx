import { randomUUID } from "crypto";
import { Element, Text } from "html-react-parser";
import { Katex } from "@/src/components/blog/Katex";
import { Strong } from "@/src/components/blog/Strong";
import { Italic } from "@/src/components/blog/Italic";
import { StrikeThrough } from "@/src/components/blog/StrikeThrough";
import { Mark } from "@/src/components/blog/Mark";
import { InlineCode } from "@/src/components/blog/InlineCode";
import { Link } from "@/src/components/blog/Link";
import { BlogComponentProp } from ".";

export const Paragraph = ({ domNode }: BlogComponentProp) => {
  if (
    domNode.children[0] instanceof Text &&
    domNode.children[0].data.match(/\$\$.*\$\$/)
  ) {
    // LaTex
    const katexString = domNode.children[0].data;
    const formattedString = katexString.slice(2, katexString.length - 2); // Removes first and last "$" ("$$...$$") from string
    return <Katex katexString={formattedString} />;
  }

  const randomId = randomUUID();
  return (
    <p className="text-base text-light-text dark:text-dark-text my-2">
      {domNode.children.map((child, index) => {
        if (child instanceof Text) {
          return child.data;
        }

        if (child instanceof Element && child.children[0] instanceof Text) {
          switch (child.tagName) {
            case "strong":
              return <Strong key={`${randomId}-${index}`} domNode={child} />;
            case "em":
              return <Italic key={`${randomId}-${index}`} domNode={child} />;
            case "s":
              return (
                <StrikeThrough key={`${randomId}-${index}`} domNode={child} />
              );
            case "mark":
              return <Mark key={`${randomId}-${index}`} domNode={child} />;
            case "code":
              return (
                <InlineCode key={`${randomId}-${index}`} domNode={child} />
              );
            case "a":
              return <Link key={`${randomId}-${index}`} domNode={child} />;
            default:
              break;
          }
        }
      })}
    </p>
  );
};
