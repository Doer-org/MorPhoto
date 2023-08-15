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
};

export default async function og({ params }: Props) {
  const morphoto = await readMorphoto(params.parent_id);
  if (morphoto.type === "error" || !morphoto.value.data) {
    return new ImageResponse(
      <img src={`${env.CLIENT_URL}/opengraph-image.png`} />
    );
  }

  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Inter:wght@600&subset=latin"
  ).then((res) => res.text());
  const fontUrl = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  )?.[1];
  if (!fontUrl) {
    return new ImageResponse(
      <img src={`${env.CLIENT_URL}/opengraph-image.png`} />
    );
  }
  const interArrayBuffer = await fetch(fontUrl).then((res) =>
    res.arrayBuffer()
  );

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
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: 440,
                  fontSize: 40,
                  color: "#687076",
                }}
              >
                {morphoto.value.data.prompt}
              </span>
              <span
                style={{
                  fontSize: 40,
                  color: "#687076",
                }}
              >
                {morphoto.value.data.strength}
              </span>
            </div>
            <img width={320} src={`${env.CLIENT_URL}/logo.png`} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interArrayBuffer,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
