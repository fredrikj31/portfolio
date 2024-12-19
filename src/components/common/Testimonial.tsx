import { Card, CardContent } from "@/shadcn/components/ui/card";
import { Testimonial as TestimonialOptions } from "@/src/services/sanity/handlers/testimonial/schemas";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";

interface TestimonialProps {
  testimonial: TestimonialOptions;
}

export const Testimonial = ({ testimonial: { author, company, position, social, testimonial } }: TestimonialProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <blockquote className="text-lg italic">&quot;{testimonial}&quot;</blockquote>
        <div className="mt-4 font-semibold flex flex-col">
          <span className="flex flex-row gap-1 items-center">
            {author}{" "}
            {social && (
              <Link href={social} target="_blank" aria-label={`Visit ${author}'s social account`}>
                <LinkIcon className="size-4" />
              </Link>
            )}
          </span>
          <span>
            {position} - {company}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
