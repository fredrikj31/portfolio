import { Header } from "@/src/components/home/Header";
import { LatestBlogPosts } from "@/src/components/home/LatestBlogPosts";
import { Testimonials } from "@/src/components/home/Testimonials";
import { Projects } from "@/src/components/home/Projects";

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
