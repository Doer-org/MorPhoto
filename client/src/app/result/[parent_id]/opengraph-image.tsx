import { readMorphoto } from "@/api";
import { getImageUrl } from "@/utils";
import { ImageResponse } from "next/server";
import { env } from "@/constants";

export const runtime = "edge";
export const revalidate = 10;

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
  searchParams: {
    prompt?: string;
    strength?: string;
  };
};

export default async function og({ params, searchParams }: Props) {
  const morphoto = await readMorphoto(params.parent_id);
  if (morphoto.type === "error") {
    return new ImageResponse(
      <img src={`${env.CLIENT_URL}/opengraph-image.png`} />
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "0 120px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: "40px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "400px",
                height: "400px",
              }}
            >
              <img
                src={`${env.CLIENT_URL}/assets/nijika1.png`}
                alt="生成画像"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "400px",
                height: "400px",
              }}
            >
              <img
                src={`${env.CLIENT_URL}/assets/nijika2.png`}
                alt="生成画像"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 40,
                  fontWeight: "bold",
                  color: "#687076",
                }}
              >
                {searchParams?.prompt || "prompt"}
              </span>
              <span
                style={{
                  fontSize: 40,
                  fontWeight: "bold",
                  color: "#687076",
                }}
              >
                {searchParams?.strength || "0.78"}
              </span>
            </div>
            <img width={320} src={`${env.CLIENT_URL}/logo.png`} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      // fonts: [
      //   name: "Inter",
      // ],
    }
  );
}
