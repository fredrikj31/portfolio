import Link from "next/link";

interface LinkHeaderProps {
  text: string;
  link: string;
}

export const LinkHeader = ({ text, link }: LinkHeaderProps) => {
  return (
    <Link href={link}>
      <h2 className="text-2xl font-semibold mb-4">{text}</h2>
    </Link>
  );
};
