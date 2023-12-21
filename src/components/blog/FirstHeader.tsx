import { Text } from "html-react-parser";
import { BlogComponentProp } from ".";

export const FirstHeader = ({ domNode }: BlogComponentProp) => {
  if (domNode.children[0] instanceof Text) {
    return (
      <h1 className="text-4xl text-light-header dark:text-dark-header">
        {domNode.children[0].data}
      </h1>
    );
  }
};
