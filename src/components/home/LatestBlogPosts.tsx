import Link from "next/link";

export const LatestBlogPosts = () => {
  return (
    <>
      <h2 className="text-3xl text-light-header dark:text-dark-header mb-3">
        Latest Blog Posts📝
      </h2>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-xl text-light-header dark:text-dark-header">
            <Link href={"/blog/why-flutter-and-firebase-are-best-buddies"}>
              Why Flutter and Firebase are best buddies
            </Link>
          </h3>
          <h4 className="text-base text-light-text dark:text-dark-text mb-2">
            <ins dateTime="Jun 28, 2021" className="no-underline">
              Jun 28, 2021
            </ins>{" "}
            ⋅ 3 min
          </h4>
          <p className="text-light-text dark:text-dark-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            pretium sed felis et pellentesque. Nullam a ligula eget augue
            tincidunt...
          </p>
        </div>
      </div>
    </>
  );
};
