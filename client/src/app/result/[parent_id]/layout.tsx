import { readMorphoto } from "@/api";
import { Metadata, ResolvingMetadata } from "next";
import { ReactNode } from "react";

export default function ResultLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

type Props = {
  params: { parent_id: string };
};

// export async function generateMetadata({ params: {parent_id} }: Props, parent?: ResolvingMetadata): Promise<Metadata> {
//   const morphoto = await readMorphoto(parent_id)
//   const previousImages = (await parent).openGraph?.images || []

//   return {
//     title: post.title,
//     description: post.summary,
//     openGraph: {
//       images: ['/some-specific-page-image.jpg', ...previousImages],
//     },
//   }
// }
