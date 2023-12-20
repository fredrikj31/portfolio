import type { Metadata } from "next";
import "@/app/ui/global.css";
import PageContainer from "@/app/ui/PageContainer";
import Footer from "@/app/ui/Footer";
import { Navbar } from "./ui/Navbar";

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
