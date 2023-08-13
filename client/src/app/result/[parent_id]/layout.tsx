import { Metadata, ResolvingMetadata } from "next";
import { ReactNode } from "react";

export default function ResultLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export async function generateMetadata(
  {},
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    openGraph: {
      images: [...previousImages],
    },
  };
}
