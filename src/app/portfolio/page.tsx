import { ProjectPreview } from "@/src/components/common/ProjectPreview";
import { project } from "@/src/services/sanity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Fredrik Johansen",
};

export default async function PortfolioPage() {
  const projects = await project.listProjects({});

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Projects focusing on continuous learning, explorations and creativity.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectPreview key={index} projectPreview={project} />
        ))}
      </div>
    </div>
  );
}
