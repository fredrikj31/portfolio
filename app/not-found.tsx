import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center mt-auto">
      <h1 className="text-light-text dark:text-dark-text">404 Not Found</h1>
      <p className="text-light-text dark:text-dark-text">
        Could not find requested resource
      </p>
      <Link href="/" className="text-light-text dark:text-dark-text">
        Return Home
      </Link>
    </div>
  );
}
