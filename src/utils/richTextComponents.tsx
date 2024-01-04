import { PortableTextReactComponents } from "@portabletext/react";
import Link from "next/link";
import katex from "katex";
import { sanityImageUrl } from "@/src/services/sanity";
import Image from "next/image";
import { getImageDimensions } from "@sanity/asset-utils";

export const richTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    code: ({ value }) => (
      <pre className="text-base bg-light-header text-dark-text p-2 rounded">
        <code className={`lang-${value.language}`}>{value.code}</code>
      </pre>
    ),
    table: ({ value }) => {
      const rows: { cells: string[] }[] = value.rows;
      const headerRow = rows[0];
      return (
        <table className="table-auto w-full text-light-text dark:text-dark-text">
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
      return (
        <p
          className="text-base text-light-text dark:text-dark-text my-2 text-center"
          dangerouslySetInnerHTML={{ __html: renderedKatex }}
        />
      );
    },
    image: ({ value }) => {
      return (
        <figure className="flex flex-col items-center w-full">
          <Image
            src={sanityImageUrl(value).url()}
            alt={value.alt}
            width={getImageDimensions(value).width}
            height={getImageDimensions(value).height}
            placeholder="blur"
            blurDataURL={sanityImageUrl(value)
              .width(24)
              .height(24)
              .blur(10)
              .url()}
            sizes="
                (max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                40vw"
          />
          {value.alt && (
            <figcaption className="text-base italic text-light-text dark:text-dark-text">
              - {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    em: ({ children }) => (
      <em className="text-base italic text-light-text dark:text-dark-text">
        {children}
      </em>
    ),
    strong: ({ children }) => (
      <strong className="text-base font-bold text-light-text dark:text-dark-text">
        {children}
      </strong>
    ),
    highlight: ({ children }) => (
      <mark className="text-base text-light-text bg-highlight">{children}</mark>
    ),
    s: ({ children }) => (
      <s className="text-base line-through text-light-text dark:text-dark-text">
        {children}
      </s>
    ),
    code: ({ children }) => (
      <code className="text-base text-dark-header px-1 font-semibold dark:text-light-header bg-light-text dark:bg-dark-text">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      return (
        <Link
          className="text-light-link dark:text-dark-link underline"
          target="_blank"
          href={value.href}
        >
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-light-text dark:text-dark-text">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-light-text dark:text-dark-text">
        {children}
      </ol>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl text-light-header dark:text-dark-header">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl text-light-header dark:text-dark-header">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl text-light-header dark:text-dark-header">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl text-light-header dark:text-dark-header">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg text-light-header dark:text-dark-header">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base text-light-header dark:text-dark-header">
        {children}
      </h6>
    ),
    normal: ({ children }) => (
      <p className="text-base text-light-text dark:text-dark-text my-2">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="px-2 py-1 my-4 border-l-4 border-light-text dark:border-dark-text bg-light-header/10 dark:bg-dark-header/10 text-light-text dark:text-dark-text rounded">
        {children}
      </blockquote>
    ),
    hr: () => (
      <hr className="my-2 border text-light-text dark:text-dark-text" />
    ),
  },
};
