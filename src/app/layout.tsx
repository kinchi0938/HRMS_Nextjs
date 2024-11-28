import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HR Manage System with Nextjs",
  description: "Make your HR Managing easier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
