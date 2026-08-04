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
        <pre className="my-4 overflow-x-auto">
          <code className="hljs rounded font-mono" dangerouslySetInnerHTML={{ __html: highlightedCode.value }} />
        </pre>
      );
    },
    table: ({ value }) => {
      const rows: { cells: string[] }[] = value.rows;
      const headerRow = rows[0];
      return (
        <div className="overflow-x-auto my-4">
          <table className="table-auto w-full my-1">
            <thead className="bg-muted">
              <tr>
                {headerRow.cells.map((headerRowCell: string, index) => (
                  <th key={index}>{headerRowCell}</th>
                ))}
              </tr>
            </thead>
            <tbody className="[&>*:nth-child(even)]:bg-muted/50">
              {rows.slice(1).map((row, index) => (
                <tr key={index}>
                  {row.cells.map((rowCell, index) => (
                    <td key={index}>{rowCell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    latex: ({ value }) => {
      const renderedKatex = katex.renderToString(value.body, {
        output: "mathml",
      });
      return (
        <div className="overflow-x-auto my-1">
          <p className="text-center" dangerouslySetInnerHTML={{ __html: renderedKatex }} />
        </div>
      );
    },
    image: ({ value }) => {
      return (
        <figure className="my-10 flex flex-col items-center w-full">
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
          {value.alt && <figcaption className="mt-3 text-center text-sm text-muted-foreground">{value.alt}</figcaption>}
        </figure>
      );
    },
  },
  marks: {
    em: ({ children }) => <em className="">{children}</em>,
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    highlight: ({ children }) => <mark className="bg-highlight text-black">{children}</mark>,
    s: ({ children }) => <s className="line-through">{children}</s>,
    code: ({ children }) => <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">{children}</code>,
    link: ({ value, children }) => {
      return (
        <a className="text-link underline" target="_blank" href={value.href}>
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-outside pl-5 my-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-outside pl-5 my-4 space-y-2">{children}</ol>,
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl mb-5 mt-10 font-bold leading-tight tracking-tight text-balance font-mono">{children}</h1>
    ),
    h2: ({ children }) => <h2 className="mb-4 mt-8 text-3xl font-bold tracking-tight font-mono">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3 mt-6 text-2xl font-semibold tracking-tight font-mono">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-2 mt-4 text-xl font-semibold tracking-tight font-mono">{children}</h4>,
    h5: ({ children }) => <h5 className="text-lg mb-1 mt-2 font-semibold tracking-tight font-mono">{children}</h5>,
    h6: ({ children }) => <h6 className="font-mono">{children}</h6>,
    normal: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="px-4 py-2 my-8 border-l-4 border-border bg-muted/40 rounded">{children}</blockquote>
    ),
    hr: () => <hr className="my-2 border" />,
  },
};
