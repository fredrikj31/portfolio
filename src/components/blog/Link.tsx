import NextLink from "next/link";
import { Text } from "html-react-parser";
import { BlogComponentProp } from ".";

export const Link = ({ domNode }: BlogComponentProp) => {
  if (domNode.children[0] instanceof Text) {
    const text = domNode.children[0].data;
    const link =
      domNode.attributes.find((attribute) => attribute.name === "href")
        ?.value || "#";
    return (
      <NextLink className="text-link underline" href={link}>
        {text}
      </NextLink>
    );
  }
};
