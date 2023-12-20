import Link from "next/link";

export const Header = () => {
  return (
    <div className="mt-10">
      <h1 className="text-4xl text-light-header dark:text-dark-header mb-3">
        Hello World👋
      </h1>
      <p className="text-light-text text-base dark:text-dark-text">
        I&apos;m a self-taught software developer who specializes in mostly in
        backend, but also a little less on frontend development. I also write
        about different programming hrefpic over on my{" "}
        <Link href={"/blog"} className="text-link">
          blog
        </Link>
        . Hop over href my{" "}
        <Link href={"/portfolio"} className="text-link">
          portfolio
        </Link>
        , href see what I spend my off-hours working on. If you&apos;re more
        interested in my professional career, check out my{" "}
        <Link href={"/resume"} className="text-link">
          resume
        </Link>{" "}
        for all the relevant information there.
      </p>
    </div>
  );
};
