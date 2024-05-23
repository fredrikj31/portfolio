import { Project } from "@/src/services/sanity/handlers/project/schemas";
import Link from "next/link";

interface ProjectPreviewProps {
  projectPreview: Omit<Project, "content">;
}

export const ProjectPreview = ({ projectPreview }: ProjectPreviewProps) => {
  return (
    <div>
      <h3 className="text-xl text-light-header dark:text-dark-header">
        <Link href={`/portfolio/${projectPreview.slug}`}>{projectPreview.title}</Link>
      </h3>
      <p className="text-light-text dark:text-dark-text max-h-32 line-clamp-3">{projectPreview.description}</p>
      {projectPreview.techstack.length > 0 && (
        <div className="flex flex-row gap-2 mt-1">
          {projectPreview.techstack.map((techStack, index) => {
            return (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-dark-background dark:bg-light-background dark:text-dark-background rounded-md text-light-background"
              >
                {techStack}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
