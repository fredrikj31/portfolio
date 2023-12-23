import { Header } from "@/src/components/home/Header";
import { LatestBlogPosts } from "@/src/components/home/LatestBlogPosts";
import { Testimonials } from "@/src/components/home/Testimonials";
import { Projects } from "@/src/components/home/Projects";
import { listBlogPosts } from "../services/hashnode";

export default async function Home() {
  const latestBlogPosts = await listBlogPosts();

  return (
    <>
      <Header />
      <div className="py-4" />
      <LatestBlogPosts blogPosts={latestBlogPosts} />
      <div className="py-4" />
      <Testimonials />
      <div className="py-4" />
      <Projects />
    </>
  );
}
