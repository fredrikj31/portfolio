import { Header } from "@/src/app/ui/Header";
import { LatestBlogPosts } from "@/src/app/ui/LatestBlogPosts";
import { Testimonials } from "@/src/app/ui/Testimonials";
import { Projects } from "@/src/app/ui/Projects";

export default function Home() {
  return (
    <>
      <Header />
      <div className="py-4" />
      <LatestBlogPosts />
      <div className="py-4" />
      <Testimonials />
      <div className="py-4" />
      <Projects />
    </>
  );
}
