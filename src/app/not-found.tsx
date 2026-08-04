import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 Not Found | Fredrik Johansen",
};

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center mt-auto">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">404 Not Found</h1>
      <Link href="/" className="text-muted-foreground hover:text-foreground">
        Return Home
      </Link>
    </div>
  );
}
