import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SiteHeader } from "@/components/global/SiteHeader";
import { SkipLink } from "@/components/global/SkipLink";
import "../style/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Child pages set just their own title, e.g. "Ana Silva | Team Directory".
  title: {
    template: "%s | Team Directory",
    default: "Team Directory",
  },
  description: "Find the people in our company and how to reach them.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-screen font-sans">
        <SkipLink />
        <SiteHeader />
        {/* tabIndex={-1} lets the skip link move focus here in every browser. */}
        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto max-w-5xl px-md py-xl focus:outline-none"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
