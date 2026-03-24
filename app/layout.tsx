import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shivaprakash G — Full Stack Developer",
  description: "Full Stack Developer specialising in FastAPI, Next.js, AWS and AI-driven platforms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
