export const Projects = () => {
  return (
    <>
      <h2 className="text-3xl text-light-header dark:text-dark-header mb-3">
        Projects🧰
      </h2>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-xl text-light-header dark:text-dark-header mb-1">
            Social Media App
          </h3>
          <div className="flex flex-row gap-2 mb-1">
            <span className="text-xs px-2 py-1 bg-dark-background dark:bg-light-background dark:text-dark-background rounded-md text-light-background">
              App
            </span>
            <span className="text-xs px-2 py-1 bg-dark-background dark:bg-light-background dark:text-dark-background rounded-md text-light-background">
              Flutter
            </span>
            <span className="text-xs px-2 py-1 bg-dark-background dark:bg-light-background dark:text-dark-background rounded-md text-light-background">
              NodeJS
            </span>
          </div>
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
