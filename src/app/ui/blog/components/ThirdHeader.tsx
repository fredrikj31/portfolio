import { Text } from "html-react-parser";
import { BlogComponentProp } from ".";

export const ThirdHeader = ({ domNode }: BlogComponentProp) => {
  if (domNode.children[0] instanceof Text) {
    return (
      <h3 className="text-2xl text-light-header dark:text-dark-header">
        {domNode.children[0].data}
      </h3>
    );
  }
};
