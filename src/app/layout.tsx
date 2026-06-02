import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VScroll Feed",
  description: "Trang xem Video cuộn dọc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} h-full antialiased dark`}>
      <body className="h-full bg-black text-white m-0 p-0 overflow-hidden antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
