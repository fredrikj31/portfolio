import { Text } from "html-react-parser";
import { BlogComponentProp } from ".";

export const Strong = ({ domNode }: BlogComponentProp) => {
  if (domNode.children[0] instanceof Text) {
    return (
      <strong className="text-base font-bold text-light-text dark:text-dark-text">
        {domNode.children[0].data}
      </strong>
    );
  }
};
