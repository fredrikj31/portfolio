import { Header } from "@/src/components/home/Header";
import { LatestBlogPosts } from "@/src/components/home/LatestBlogPosts";
import { Testimonials } from "@/src/components/home/Testimonials";
import { Projects } from "@/src/components/home/Projects";
import { listBlogPosts } from "../services/hashnode";

export default async function Home() {
  const latestBlogPosts = await listBlogPosts({ numberOfPosts: 3 });

  return (
    <>
      <Header />
      <div className="py-4" />
      <h2 className="text-3xl text-light-header dark:text-dark-header mb-3">
        Latest Blog Posts📝
      </h2>
      <LatestBlogPosts blogPosts={latestBlogPosts} />
      <div className="py-4" />
      <Testimonials />
      <div className="py-4" />
      <Projects />
    </>
  );
}
