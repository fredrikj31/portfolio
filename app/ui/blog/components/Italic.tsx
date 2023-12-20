import { Text } from "html-react-parser";
import { BlogComponentProp } from ".";

export const Italic = ({ domNode }: BlogComponentProp) => {
  if (domNode.children[0] instanceof Text) {
    return (
      <em className="text-base italic text-light-text dark:text-dark-text">
        {domNode.children[0].data}
      </em>
    );
  }
};
