import type { Metadata } from "next";
import "@/src/app/ui/global.css";
import PageContainer from "@/src/app/ui/PageContainer";
import Footer from "@/src/app/ui/Footer";
import { Navbar } from "./ui/Navbar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Home - Fredrik Johansen",
  description: "Fredrik Johansen's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://eu.umami.is/script.js"
          data-website-id="870dd235-bcfa-4650-bedc-0ec2bd5fe1a0"
        />
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
