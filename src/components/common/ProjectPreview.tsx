import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { Project } from "@/src/services/sanity/handlers/project/schemas";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ProjectPreviewProps {
  projectPreview: Omit<Project, "content">;
}

export const ProjectPreview = ({ projectPreview }: ProjectPreviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/portfolio/${projectPreview.slug}`} className="hover:underline">
            {projectPreview.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 truncate line-clamp-2 whitespace-pre-wrap">
          {projectPreview.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {projectPreview.techstack.map((tag) => (
            <span key={tag} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto">
        {projectPreview.readTimeInMinutes && (
          <div className="text-sm text-muted-foreground">{projectPreview.readTimeInMinutes} min read</div>
        )}
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/portfolio/${projectPreview.slug}`}>
            Read more <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
