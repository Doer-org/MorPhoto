import { env } from "@/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MorphotoHeader } from "./_components";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const siteName = "MorPhoto";
const description = "Let's start morphing!";
const url = "https://www.morphoto.app/";

export const metadata: Metadata = {
  metadataBase: new URL(env.CLIENT_URL),
  title: {
    default: siteName,
    template: `%s｜${siteName}`,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
  },
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
