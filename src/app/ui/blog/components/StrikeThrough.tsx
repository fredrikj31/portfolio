import { Text } from "html-react-parser";
import { BlogComponentProp } from ".";

export const StrikeThrough = ({ domNode }: BlogComponentProp) => {
  if (domNode.children[0] instanceof Text) {
    return (
      <s className="text-base line-through text-light-text dark:text-dark-text">
        {domNode.children[0].data}
      </s>
    );
  }
};
