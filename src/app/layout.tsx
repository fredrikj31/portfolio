import type { Metadata } from "next";
import "@/src/app/global.css";
import PageContainer from "@/src/components/PageContainer";
import Footer from "@/src/components/Footer";
import { Navbar } from "@/src/components/Navbar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Home - Fredrik Johansen",
  description:
    "A self-taught software developer from Denmark, which uses his spare time to create side-projects and write technical blog posts.",
  authors: { name: "Fredrik Johansen" },
  category: "software development",
  keywords: [
    "software development",
    "development",
    "engineering",
    "technical",
    "programming",
    "self-taught",
    "blog",
    "portfolio",
  ],
  metadataBase: new URL("https://fredrikjohansen.dev"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === "production" && (
          <Script
            async
            src="https://eu.umami.is/script.js"
            data-website-id="870dd235-bcfa-4650-bedc-0ec2bd5fe1a0"
          />
        )}
      </head>
      <body>
        <PageContainer>
          <Navbar />
          {children}
          <Footer />
        </PageContainer>
      </body>
    </html>
  );
}
