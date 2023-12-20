import { Element, Text } from "html-react-parser";
import { BlogComponentProp } from ".";

export const UnorderedList = ({ domNode }: BlogComponentProp) => {
  const listElements = domNode.children
    .flat()
    .filter((elem) => elem.prev instanceof Element && elem.prev.name === "li")
    .map((elem) => elem.prev);
  return (
    <ul className="list-disc list-inside text-light-text dark:text-dark-text">
      {listElements.map(
        (listElement, index) =>
          listElement instanceof Element &&
          listElement.children[0] instanceof Text && (
            <li key={index}>{listElement.children[0].data}</li>
          )
      )}
    </ul>
  );
};
