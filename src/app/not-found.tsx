import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 Not Found | Fredrik Johansen",
};

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center mt-auto">
      <h1 className="text-light-text dark:text-dark-text">404 Not Found</h1>
      <Link href="/" className="text-light-text dark:text-dark-text">
        Return Home
      </Link>
    </div>
  );
}
