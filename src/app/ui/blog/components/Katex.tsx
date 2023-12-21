import katex from "katex";

interface KatexProps {
  katexString: string;
}

export const Katex = ({ katexString }: KatexProps) => {
  const renderedKatex = katex.renderToString(katexString, {
    output: "html",
  });
  return (
    <p
      className="text-base text-light-text dark:text-dark-text my-2 text-center"
      dangerouslySetInnerHTML={{ __html: renderedKatex }}
    />
  );
};
