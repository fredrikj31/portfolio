import parse, { Element, Text } from "html-react-parser";
import { FirstHeader } from "@/app/ui/blog/components/FirstHeader";
import { SecondHeader } from "@/app/ui/blog/components/SecondHeader";
import { ThirdHeader } from "@/app/ui/blog/components/ThirdHeader";
import { Strong } from "@/app/ui/blog/components/Strong";
import { Italic } from "@/app/ui/blog/components/Italic";
import { StrikeThrough } from "@/app/ui/blog/components/StrikeThrough";
import { Mark } from "@/app/ui/blog/components/Mark";
import { InlineCode } from "@/app/ui/blog/components/InlineCode";
import { Link } from "@/app/ui/blog/components/Link";
import { UnorderedList } from "@/app/ui/blog/components/UnorderedList";
import { OrderedList } from "@/app/ui/blog/components/OrderedList";
import { Divider } from "@/app/ui/blog/components/Divider";
import { Code } from "@/app/ui/blog/components/Code";
import { Blockquote } from "@/app/ui/blog/components/Blockquote";
import { Details } from "@/app/ui/blog/components/Details";
import { Table } from "@/app/ui/blog/components/Table";
import { FigureImage } from "@/app/ui/blog/components/FigureImage";
import { Callout } from "@/app/ui/blog/components/Callout";
import { Embed } from "@/app/ui/blog/components/Embed";
import { Paragraph } from "@/app/ui/blog/components/Paragraph";

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
