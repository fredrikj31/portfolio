import { DOMNode, domToReact } from "html-react-parser";
import { BlogComponentProp } from ".";

export const Details = ({ domNode }: BlogComponentProp) => {
  return (
    <details className="text-light-text dark:text-dark-text">
      {domToReact(domNode.children as DOMNode[])}
    </details>
  );
};
