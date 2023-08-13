import { readMorphoto } from "@/api";
import { getImageUrl } from "@/utils";
import Image from "next/image";
import { ImageResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 50;

export const alt = "変換画像";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: {
    parent_id: string;
  };
};

export default async function og({ params }: Props) {
  const morphoto = await readMorphoto(params.parent_id);
  // if (morphoto.type === "error") {
  //   return new Response("Not Found", { status: 404 });
  // }
  console.log(morphoto);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Image src={"/assets/example1.png"} fill alt="生成画像" />
      </div>
    ),
    {
      ...size,
    }
  );
}
