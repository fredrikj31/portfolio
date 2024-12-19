import { Badge } from "@/shadcn/components/ui/badge";
import { Card, CardContent } from "@/shadcn/components/ui/card";
import { Project } from "@/src/services/sanity/handlers/project/schemas";
import Link from "next/link";

interface ProjectPreviewProps {
  projectPreview: Omit<Project, "content">;
}

export const ProjectPreview = ({ projectPreview }: ProjectPreviewProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <Link href={`/portfolio/${projectPreview.slug}`}>
          <h3 className="text-xl font-semibold mb-2">{projectPreview.title}</h3>
        </Link>
        <p className="text-muted-foreground mb-4">{projectPreview.description}</p>
        <div className="flex gap-2">
          {projectPreview.techstack.length > 0 && (
            <div className="flex flex-row gap-1">
              {projectPreview.techstack.map((techStack, index) => {
                return (
                  <Badge key={index} className="text-xs px-2 py-1 rounded-md">
                    {techStack}
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
