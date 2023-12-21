import type { Metadata } from "next";
import "@/src/app/global.css";
import PageContainer from "@/src/components/PageContainer";
import Footer from "@/src/components/Footer";
import { Navbar } from "@/src/components/Navbar";
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
