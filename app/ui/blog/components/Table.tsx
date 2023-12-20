import { DOMNode, domToReact, Element } from "html-react-parser";
import { BlogComponentProp } from ".";

export const Table = ({ domNode }: BlogComponentProp) => {
  const tableHeader = domNode.children.filter(
    (child) => child instanceof Element && child.tagName === "thead"
  )[0] as Element;
  const tableBody = domNode.children.filter(
    (child) => child instanceof Element && child.tagName === "tbody"
  )[0] as Element;
  return (
    <table className="table-auto w-full text-light-text dark:text-dark-text">
      <thead className="bg-light-header/20 dark:bg-dark-header/50">
        {domToReact(tableHeader.children as DOMNode[])}
      </thead>
      <tbody className="[&>*:nth-child(even)]:bg-light-header/10 [&>*:nth-child(even)]:dark:bg-dark-header/10">
        {domToReact(tableBody.children as DOMNode[])}
      </tbody>
    </table>
  );
};
