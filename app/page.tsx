import { Header } from "@/app/ui/Header";
import { LatestBlogPosts } from "@/app/ui/LatestBlogPosts";
import { Testimonials } from "@/app/ui/Testimonials";
import { Projects } from "@/app/ui/Projects";

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
