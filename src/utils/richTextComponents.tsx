import { PortableTextReactComponents } from "@portabletext/react";
import Link from "next/link";
import katex from "katex";
import { sanityImageUrl } from "@/src/services/sanity";
import Image from "next/image";
import { getImageDimensions } from "@sanity/asset-utils";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

export const richTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    code: ({ value }) => {
      const highlightedCode = hljs.highlightAuto(value.code, [value.language]);
      return (
        <pre className="p-2 rounded my-1">
          <code dangerouslySetInnerHTML={{ __html: highlightedCode.value }} />
        </pre>
      );
    },
    table: ({ value }) => {
      const rows: { cells: string[] }[] = value.rows;
      const headerRow = rows[0];
      return (
        <table className="table-auto w-full my-1">
          <thead className="bg-light-header/20 dark:bg-dark-header/20">
            <tr>
              {headerRow.cells.map((headerRowCell: string, index) => (
                <th key={index}>{headerRowCell}</th>
              ))}
            </tr>
          </thead>
          <tbody className="[&>*:nth-child(even)]:bg-light-header/10 [&>*:nth-child(even)]:dark:bg-dark-header/10">
            {rows.slice(1).map((row, index) => (
              <tr key={index}>
                {row.cells.map((rowCell, index) => (
                  <td key={index}>{rowCell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    },
    latex: ({ value }) => {
      const renderedKatex = katex.renderToString(value.body, {
        output: "mathml",
      });
      return <p className="my-1 text-center" dangerouslySetInnerHTML={{ __html: renderedKatex }} />;
    },
    image: ({ value }) => {
      return (
        <figure className="flex flex-col items-center w-full my-1">
          <Image
            src={sanityImageUrl(value).url()}
            alt={value.alt}
            width={getImageDimensions(value).width}
            height={getImageDimensions(value).height}
            placeholder="blur"
            blurDataURL={sanityImageUrl(value).width(24).height(24).blur(10).url()}
            sizes="
                (max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                40vw"
          />
          {value.alt && <figcaption className="italic">- {value.alt}</figcaption>}
        </figure>
      );
    },
  },
  marks: {
    em: ({ children }) => <em className="">{children}</em>,
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    highlight: ({ children }) => <mark className="bg-highlight">{children}</mark>,
    s: ({ children }) => <s className="line-through">{children}</s>,
    code: ({ children }) => <code className="px-1 font-semibold">{children}</code>,
    link: ({ value, children }) => {
      return (
        <a className="text-blue-500 underline" target="_blank" href={value.href}>
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside my-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside my-1">{children}</ol>,
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl">{children}</h4>,
    h5: ({ children }) => <h5 className="text-lg">{children}</h5>,
    h6: ({ children }) => <h6>{children}</h6>,
    normal: ({ children }) => <p className="my-2">{children}</p>,
    blockquote: ({ children }) => <blockquote className="px-2 py-1 my-1 border-l-4 rounded">{children}</blockquote>,
    hr: () => <hr className="my-2 border" />,
  },
};
