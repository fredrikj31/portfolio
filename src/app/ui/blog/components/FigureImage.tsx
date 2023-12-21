import { Element } from "html-react-parser";
import NextImage from "next/image";
import { BlogComponentProp } from ".";

export const FigureImage = ({ domNode }: BlogComponentProp) => {
  if (!(domNode.children[0] instanceof Element)) return;
  const src = domNode.children[0].attribs["src"];
  const alt = domNode.children[0].attribs["alt"];
  return (
    <figure className="flex flex-col items-center w-full">
      <NextImage width={500} height={500} src={src} alt={alt} />

      {alt && (
        <figcaption className="text-base italic text-light-text dark:text-dark-text">
          - {alt}
        </figcaption>
      )}
    </figure>
  );
};
