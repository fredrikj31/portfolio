import { ProjectPreview } from "@/src/components/common/ProjectPreview";
import { project } from "@/src/services/sanity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Fredrik Johansen",
};

export default async function PortfolioPage() {
  const projects = await project.listProjects({});

  return (
    <>
      <div className="mt-10">
        <h1 className="text-4xl text-light-header dark:text-dark-header mb-3">Portfolio🧰</h1>
        <div className="flex flex-col gap-5">
          {projects.map((project, index) => (
            <ProjectPreview key={index} projectPreview={project} />
          ))}
        </div>
      </div>
    </>
  );
}
