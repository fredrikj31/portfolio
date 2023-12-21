import { domToReact, DOMNode } from "html-react-parser";
import { BlogComponentProp } from ".";

export const Code = ({ domNode }: BlogComponentProp) => {
  return (
    <pre className="text-base bg-light-header text-dark-text p-2 rounded">
      {domToReact(domNode.children as DOMNode[])}
    </pre>
  );
};
