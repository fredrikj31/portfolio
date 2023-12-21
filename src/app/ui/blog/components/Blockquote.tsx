import { DOMNode, domToReact } from "html-react-parser";
import { BlogComponentProp } from ".";

export const Blockquote = ({ domNode }: BlogComponentProp) => {
  return (
    <blockquote className="px-2 py-1 my-4 border-l-4 border-light-text dark:border-dark-text bg-light-header/10 dark:bg-dark-header/10 text-light-text dark:text-dark-text rounded">
      {domToReact(domNode.children as DOMNode[])}
    </blockquote>
  );
};
