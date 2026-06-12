import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TODO: Your Name | Full-stack Developer Portfolio",
  description:
    "TODO: Your Name builds full-stack web apps with React, Node.js, Express, HTML, CSS, and JavaScript.",
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#0b0f17",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
