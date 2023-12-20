import { Text } from "html-react-parser";
import { BlogComponentProp } from ".";

export const SecondHeader = ({ domNode }: BlogComponentProp) => {
  if (domNode.children[0] instanceof Text) {
    return (
      <h2 className="text-3xl text-light-header dark:text-dark-header">
        {domNode.children[0].data}
      </h2>
    );
  }
};
