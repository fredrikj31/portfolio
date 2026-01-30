"use client";

import Link from "next/link";
import { Twitter } from "./icons/Twitter";
import { LinkedIn } from "./icons/LinkedIn";
import { Github } from "./icons/Github";
import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t py-6 mt-auto w-full print:hidden">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <Link
            target="_blank"
            href="https://twitter.com/fredrikj31"
            className="text-muted-foreground hover:text-primary"
          >
            <Twitter className="size-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            target="_blank"
            href="https://linkedin.com/in/fredrik-johansen/"
            className="text-muted-foreground hover:text-primary"
          >
            <LinkedIn className="size-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            target="_blank"
            href="https://github.com/fredrikj31"
            className="text-muted-foreground hover:text-primary"
          >
            <Github className="size-6" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">© {year} Fredrik Johansen. All rights reserved.</p>
      </div>
    </footer>
  );
}
