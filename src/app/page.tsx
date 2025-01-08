import { home } from "@/src/services/sanity";
import { BlogPostPreview } from "@/src/components/common/BlogPostPreview";
import { Testimonial } from "@/src/components/common/Testimonial";
import { Metadata } from "next";
import { ProjectPreview } from "../components/common/ProjectPreview";
import { Button } from "@/shadcn/components/ui/button";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const homeSeo = await home.getHomeSeo();

  if (!homeSeo) {
    return {
      title: "Home - Fredrik Johansen",
    };
  }

  return {
    title: homeSeo.title,
    category: "website",
    keywords: homeSeo.keywords.join(", "),
    metadataBase: new URL("https://fredrikjohansen.dev"),
    publisher: "Fredrik Johansen",
    authors: { name: "Fredrik Johansen", url: "/" },
    description: homeSeo.description,
    openGraph: {
      type: "website",
      description: homeSeo.description,
      title: homeSeo.title,
      url: "/",
    },
  };
}

export default async function Home() {
  const homeContent = await home.getHomeContent();

  return (
    <>
      <div className="mt-8 flex flex-col gap-8">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{homeContent.header}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{homeContent.subheader}</p>
          <div className="flex justify-center gap-4">
            {homeContent.buttons.map(({ type, text, link, isExternal }, index) => {
              const url = new URL(link);
              return (
                <Button key={index} variant={type === "primary" ? "default" : "secondary"} asChild>
                  <Link href={isExternal ? url.href : url.pathname}>{text}</Link>
                </Button>
              );
            })}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
          <div className="flex flex-col gap-4 items-center">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
              {homeContent.blogPosts.map((blogPost, index) => (
                <BlogPostPreview key={index} blogPostPreview={blogPost} />
              ))}
            </div>
            <Button variant={"outline"} asChild>
              <Link href={"/blog"}>View All Posts</Link>
            </Button>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
          <div className="flex flex-col gap-4 w-full items-center">
            <div className="flex flex-row gap-6 w-full">
              {homeContent.testimonials.map((testimonial, index) => (
                <Testimonial key={index} testimonial={testimonial} />
              ))}
            </div>
            <Button variant={"outline"} asChild>
              <Link href={"/testimonials"}>View All Testimonials</Link>
            </Button>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <div className="flex flex-col gap-4 items-center">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
              {homeContent.projects.map((project, index) => (
                <ProjectPreview key={index} projectPreview={project} />
              ))}
            </div>
            <Button variant={"outline"} asChild>
              <Link href={"/portfolio"}>View Projects</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
