import type { Metadata } from "next";
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
      className={`flex justify-center items-center ${inter.className}`}
    >
      <body className="bg-black h-full max-w-[1080px] w-full">
        {children}
        <footer className="bg-[#B0B0B0] h-16 py-2 flex items-center justify-center border border-[#dedede] text-black">
          <p>© {new Date().getFullYear()} MySide</p>
        </footer>
      </body>
    </html>
  );
}
