import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <div className="mt-5" />
      <h1 className="text-light-header text-4xl dark:text-dark-header mb-2">
        Introduction👋
      </h1>
      <section className="flex md:flex-row flex-col items-center">
        <p className="text-light-text text-base dark:text-dark-text">
          Hi I&apos;m Fredrik Johansen, a young, inspired self-taught software
          developer with 5 years of experience with building different types of
          digital products/solutions. I&apos;m a out-going and open-minded
          person, that&apos;s always ready for a new challenge/problem to solve
          to make an impact for other people.
        </p>
        <div className="flex flex-col items-center my-4 md:my-0 md:ml-3 md:w-[70rem]">
          <Image
            className="rounded-full"
            src="https://avatars.githubusercontent.com/u/31306224?v=4"
            alt="Image of me, Fredrik Johansen"
            width={125}
            height={125}
          />
          <p className="italic dark:text-dark-text text-light-text mt-2">
            - Picture of Fredrik Johansen
          </p>
        </div>
      </section>
      <h1 className="text-light-header text-4xl dark:text-dark-header mb-2">
        The Start🌱
      </h1>
      <section className="flex flex-row">
        <p className="text-light-text text-base dark:text-dark-text">
          Hi👋 I&apos;m Fredrik Johansen, a young, inspired self-taught software
          developer with 5 years of experience with building different types of
          digital products/solutions. I&apos;m a out-going and open-minded
          person, that&apos;s always ready for a new challenge/problem to solve
          to make an impact for other people.
        </p>
      </section>
    </>
  );
}
