export const Testimonials = () => {
  return (
    <>
      <h2 className="text-3xl text-light-header dark:text-dark-header mb-3">
        Testimonials💬
      </h2>
      <div className="flex flex-col gap-4">
        <blockquote className="flex flex-col">
          <p className="text-light-text dark:text-dark-text italic mb-2">
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            pretium sed felis et pellentesque. Nullam a ligula eget augue
            tincidunt...”
          </p>
          <footer className="flex flex-col">
            <cite className="text-light-text dark:text-dark-text not-italic">
              John Doe
            </cite>
            <span className="text-light-text dark:text-dark-text">
              Product Manager - Google
            </span>
          </footer>
        </blockquote>
      </div>
    </>
  );
};
