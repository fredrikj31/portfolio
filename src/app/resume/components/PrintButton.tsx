"use client";

import { Button } from "@/shadcn/components/ui/button";

export const PrintButton = () => {
  return (
    <div className="w-full print:hidden flex justify-end my-4">
      <Button className=" w-fit mt-4" onClick={() => window.print()}>
        Print Resume
      </Button>
    </div>
  );
};
