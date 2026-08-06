"use client";
import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, theme: "default" });

type MermaidDiagramProps = {
  code: string;
};

export const MermaidDiagram = ({ code }: MermaidDiagramProps) => {
  const renderId = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    mermaid
      .render(`mermaid-${renderId}`, code)
      .then(({ svg: renderedSvg }) => {
        if (!cancelled) setSvg(renderedSvg);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [code, renderId]);

  if (error) {
    return (
      <div className="my-4 rounded bg-muted p-3 text-sm text-muted-foreground">Unable to render diagram.</div>
    );
  }

  if (!svg) {
    return null;
  }

  return (
    <div
      className="my-4 w-full overflow-x-auto [&_p]:text-base! [&_p]:leading-normal! [&>svg]:mx-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
