import { DOMNode, domToReact } from "html-react-parser";
import { BlogComponentProp } from ".";

export const Callout = ({ domNode }: BlogComponentProp) => {
  return (
    <div className="flex flex-row bg-light-header/10 dark:bg-dark-header/10 text-light-text dark:text-dark-text text-xl p-2 rounded">
      {domToReact(domNode.children as DOMNode[])}
    </div>
  );
};
