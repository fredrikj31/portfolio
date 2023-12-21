"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Navbar = () => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const darkModeToggle = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <div>
        <Link
          href={"/"}
          style={{
            textDecorationLine: pathname === "/" ? "underline" : "none",
          }}
          className="text-light-text dark:text-dark-text text-xl under"
        >
          home
        </Link>
        <span className="md:mx-5 mx-4 text-light-text dark:text-dark-text">
          -
        </span>
        <Link
          href={"/about"}
          style={{
            textDecorationLine: pathname.includes("/about")
              ? "underline"
              : "none",
          }}
          className="text-light-text dark:text-dark-text text-xl"
        >
          about
        </Link>
        <span className="md:mx-5 mx-4 text-light-text dark:text-dark-text">
          -
        </span>
        <Link
          href={"/blog"}
          style={{
            textDecorationLine: pathname.includes("/blog")
              ? "underline"
              : "none",
          }}
          className="text-light-text dark:text-dark-text text-xl"
        >
          blog
        </Link>
        <span className="md:mx-5 mx-4 text-light-text dark:text-dark-text">
          -
        </span>
        <Link
          href={"/resume"}
          style={{
            textDecorationLine: pathname === "/resume" ? "underline" : "none",
          }}
          className="text-light-text dark:text-dark-text text-xl"
        >
          resume
        </Link>
        <span className="md:mx-5 mx-4 text-light-text dark:text-dark-text">
          -
        </span>
        <Link
          href={"/portfolio"}
          style={{
            textDecorationLine:
              pathname === "/portfolio" ? "underline" : "none",
          }}
          className="text-light-text dark:text-dark-text text-xl"
        >
          portfolio
        </Link>
      </div>
      <button
        className="p-1 rounded-full bg-dark-background dark:bg-light-background flex justify-center items-center border-none cursor-pointer"
        onClick={darkModeToggle}
        aria-label="Dark mode button switcher"
      >
        {!isDarkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18px"
            height="18px"
            viewBox="0 0 25 25"
            className="fill-light-background dark:fill-dark-background"
          >
            <path
              d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18px"
            height="18px"
            viewBox="0 0 25 25"
            className="dark:fill-dark-background fill-light-background dark:stroke-dark-background stroke-light-background"
          >
            <path
              d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
};
