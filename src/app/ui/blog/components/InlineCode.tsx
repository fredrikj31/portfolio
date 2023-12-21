import { Text } from "html-react-parser";
import { BlogComponentProp } from ".";

export const InlineCode = ({ domNode }: BlogComponentProp) => {
  if (domNode.children[0] instanceof Text) {
    return (
      <code className="text-base text-dark-header px-1 font-semibold dark:text-light-header bg-light-text dark:bg-dark-text">
        {domNode.children[0].data}
      </code>
    );
  }
};
