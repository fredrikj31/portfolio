import { Element } from "html-react-parser";
import { Tweet } from "react-tweet";
import { BlogComponentProp } from ".";

export const Embed = ({ domNode }: BlogComponentProp) => {
  const embedLink = domNode.children.filter(
    (child) => child instanceof Element && child.tagName === "a"
  )[0];

  // twitter embed
  if (
    embedLink instanceof Element &&
    embedLink.attribs["href"].includes("twitter.com")
  ) {
    const splicedLink = embedLink.attribs["href"].split("/");
    const tweetId = splicedLink[splicedLink.length - 1];

    return (
      <div className="flex justify-center">
        <Tweet id={tweetId} />
      </div>
    );
  }

  // youtube embed
  if (
    embedLink instanceof Element &&
    embedLink.attribs["href"].includes("youtube.com")
  ) {
    const splicedLink = embedLink.attribs["href"].match(/=.*&/);
    const videoId = splicedLink?.[0].slice(1, splicedLink[0].length - 1);

    return (
      <div className="flex justify-center">
        <iframe
          width={500}
          height={300}
          src={`https://www.youtube.com/embed/${videoId}`}
        />
      </div>
    );
  }
};
