import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Fredrik Johansen",
};

export default async function PortfolioPage() {
  return (
    <>
      <div className="mt-10">
        <h1 className="text-4xl text-light-header dark:text-dark-header mb-3">Portfolio🧰</h1>
        <div className="flex flex-col gap-5"></div>
      </div>
    </>
  );
}
