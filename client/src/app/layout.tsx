import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MorphotoHeader } from "./_components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MorPhoto",
  description: "Let's start morphing!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MorphotoHeader />
        <div
          style={{
            paddingTop: 52,
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
