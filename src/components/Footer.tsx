export default function Footer() {
  return (
    <footer className="mt-auto w-full pt-5">
      <div className="flex flex-col">
        <div className="flex flex-row justify-evenly">
          <a
            className="text-light-link dark:text-dark-link underline cursor-pointer"
            target="_blank"
            href="https://twitter.com/fredrikj31"
          >
            twitter
          </a>
          <a
            className="text-light-link dark:text-dark-link underline cursor-pointer"
            target="_blank"
            href="https://www.linkedin.com/in/fredrik-johansen"
          >
            linked-in
          </a>
          <a
            className="text-light-link dark:text-dark-link underline cursor-pointer"
            target="_blank"
            href="https://github.com/fredrikj31"
          >
            github
          </a>
        </div>
        <div className="flex justify-center dark:text-dark-text text-light-text">
          &copy; {`Fredrik Johansen ${new Date().getFullYear()}`}
        </div>
      </div>
    </footer>
  );
}
