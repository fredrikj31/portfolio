import type { Metadata } from "next";
import "@/src/app/global.css";
import PageContainer from "@/src/components/PageContainer";
import Footer from "@/src/components/Footer";
import { Navbar } from "@/src/components/Navbar";
import Script from "next/script";
import { ThemeProvider } from "../providers/ThemeProvider";
import { FestiveParticles } from "../components/FestiveParticles";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "../components/common/DisableDraftMode";

export const metadata: Metadata = {
  title: "Fredrik Johansen",
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
    "projects",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === "production" && (
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="870dd235-bcfa-4650-bedc-0ec2bd5fe1a0"
          ></Script>
        )}
      </head>
      <body className="bg-background min-h-screen flex flex-col">
        <FestiveParticles />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <PageContainer>{children}</PageContainer>
          <Footer />
        </ThemeProvider>
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}
