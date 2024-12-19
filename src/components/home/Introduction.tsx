import { Button } from "@shadcn/components/ui/button";
import Link from "next/link";

export const Introduction = () => {
  return (
    <section className="text-center space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">Fredrik Johansen</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Self-taught software developer specializing in backend and some frontend development. I write about various
        programming topics on my blog.
      </p>
      <div className="flex justify-center gap-4">
        <Button variant="default" asChild>
          <Link href="/about">About Me</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/projects">View Projects</Link>
        </Button>
      </div>
    </section>
  );
};
