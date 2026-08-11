import type { Metadata } from "next";
import "@/src/app/global.css";
import PageContainer from "@/src/components/PageContainer";
import Footer from "@/src/components/Footer";
import { Navbar } from "@/src/components/Navbar";
import Script from "next/script";
import { ThemeProvider } from "../providers/ThemeProvider";
import { FestiveParticles } from "../components/FestiveParticles";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "../components/common/DisableDraftMode";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

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
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {process.env.NODE_ENV === "production" && (
          <Script
            defer
            src="https://analytics.fredrikjohansen.dev/script.js"
            data-website-id="66f1cdbf-3e1a-40ba-a652-ce9e8061408e"
          />
        )}
      </head>
      <body className="bg-background min-h-screen flex flex-col font-sans antialiased">
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
