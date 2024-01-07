import Link from "next/link";

interface LinkHeaderProps {
  text: string;
  emoji: string;
  link: string;
}

export const LinkHeader = ({ text, emoji, link }: LinkHeaderProps) => {
  return (
    <h2 className="text-3xl text-light-header dark:text-dark-header mb-3">
      <Link className="underline" href={link}>
        {text}
      </Link>
      {emoji}
    </h2>
  );
};
