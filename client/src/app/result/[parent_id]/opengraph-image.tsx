import { readMorphoto } from "@/api";
import { getImageUrl } from "@/utils";
import Image from "next/image";
import { ImageResponse } from "next/server";

export const runtime = "edge";

type Props = {
  params: {
    parent_id: string;
  };
};

export const size = {
  width: 600,
  height: 600,
};
export const contentType = "image/png";

export default async function og({ params: { parent_id } }: Props) {
  const morphoto = await readMorphoto(parent_id);
  if (morphoto.type === "error")
    return new Response("Not Found", { status: 404 });

  new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src={getImageUrl(morphoto.value.data.child_id)}
          fill
          alt="生成画像"
        />
      </div>
    )
  ),
    {
      ...size,
    };
}