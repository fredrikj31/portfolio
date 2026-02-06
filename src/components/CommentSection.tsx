"use client";

import Giscus from "@giscus/react";

export const CommentSection = () => {
  return (
    <Giscus
      id="comments"
      repo="fredrikj31/portfolio"
      repoId="R_kgDOK78dAA"
      category="Comments"
      categoryId="DIC_kwDOK78dAM4C1-g-"
      mapping="pathname"
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="en"
      loading="lazy"
    />
  );
};
