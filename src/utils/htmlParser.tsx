import parse, { Element, Text } from "html-react-parser";
import { FirstHeader } from "@/src/components/blog/FirstHeader";
import { SecondHeader } from "@/src/components/blog/SecondHeader";
import { ThirdHeader } from "@/src/components/blog/ThirdHeader";
import { Strong } from "@/src/components/blog/Strong";
import { Italic } from "@/src/components/blog/Italic";
import { StrikeThrough } from "@/src/components/blog/StrikeThrough";
import { Mark } from "@/src/components/blog/Mark";
import { InlineCode } from "@/src/components/blog/InlineCode";
import { Link } from "@/src/components/blog/Link";
import { UnorderedList } from "@/src/components/blog/UnorderedList";
import { OrderedList } from "@/src/components/blog/OrderedList";
import { Divider } from "@/src/components/blog/Divider";
import { Code } from "@/src/components/blog/Code";
import { Blockquote } from "@/src/components/blog/Blockquote";
import { Details } from "@/src/components/blog/Details";
import { Table } from "@/src/components/blog/Table";
import { FigureImage } from "@/src/components/blog/FigureImage";
import { Callout } from "@/src/components/blog/Callout";
import { Embed } from "@/src/components/blog/Embed";
import { Paragraph } from "@/src/components/blog/Paragraph";

export function parseHTML(htmlString: string) {
  const reactElements = parse(htmlString, {
    replace(domNode) {
      if (!(domNode instanceof Element)) {
        return null;
      }

      switch (domNode.tagName) {
        case "h1":
          return <FirstHeader domNode={domNode} />;
        case "h2":
          return <SecondHeader domNode={domNode} />;
        case "h3":
          return <ThirdHeader domNode={domNode} />;
        case "p":
          if (
            domNode.children[0] instanceof Element &&
            domNode.children[0].tagName === "img"
          ) {
            return <FigureImage domNode={domNode} />;
          }
          return <Paragraph domNode={domNode} />;
        case "strong":
          return <Strong domNode={domNode} />;
        case "em":
          return <Italic domNode={domNode} />;
        case "s":
          return <StrikeThrough domNode={domNode} />;
        case "mark":
          return <Mark domNode={domNode} />;
        case "code":
          return <InlineCode domNode={domNode} />;
        case "a":
          return <Link domNode={domNode} />;
        case "ul":
          return <UnorderedList domNode={domNode} />;
        case "ol":
          return <OrderedList domNode={domNode} />;
        case "hr":
          return <Divider />;
        case "pre":
          return <Code domNode={domNode} />;
        case "blockquote":
          return <Blockquote domNode={domNode} />;
        case "details":
          return <Details domNode={domNode} />;
        case "table":
          return <Table domNode={domNode} />;
        case "div":
          if (
            domNode.attributes.find(
              (attribute) => attribute.name === "data-node-type"
            )?.value === "callout"
          ) {
            return <Callout domNode={domNode} />;
          }

          if (domNode.attribs["class"].includes("embed-wrapper")) {
            return <Embed domNode={domNode} />;
          }
        default:
          break;
      }
    },
  });

  return reactElements;
}
