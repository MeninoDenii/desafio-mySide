import type { Metadata } from "next";
import { CartProvider } from "@/context";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MySide",
  description: "A simple blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`flex justify-center items-center h-full ${inter.className}`}
    >
      <body className="bg-black h-full max-w-[1080px] w-full">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
