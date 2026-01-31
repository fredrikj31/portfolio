"use client";

import { Button } from "@/shadcn/components/ui/button";

export const PrintButton = () => {
  return (
    <div className="w-full print:hidden flex justify-end my-4">
      <Button className="w-fit" onClick={() => window.print()} data-umami-event="resume-print">
        Print Resume
      </Button>
    </div>
  );
};
