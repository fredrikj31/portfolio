import { Text } from "html-react-parser";
import { BlogComponentProp } from ".";

export const Mark = ({ domNode }: BlogComponentProp) => {
  if (domNode.children[0] instanceof Text) {
    return (
      <mark className="text-base text-light-text bg-highlight">
        {domNode.children[0].data}
      </mark>
    );
  }
};
