import { env } from "@/constants/env";
import { Storage } from "@google-cloud/storage";
import { NextRequest, NextResponse } from "next/server";

const { GCP_PROJECT_ID, GCP_BUCKET_NAME, GCP_CREDENTIALS } = env;

export async function POST(request: NextRequest) {
  const storage = new Storage({
    projectId: GCP_PROJECT_ID,
    credentials: JSON.parse(GCP_CREDENTIALS),
  });
  console.log("POST: /api/image/upload");
  const bucket = storage.bucket(GCP_BUCKET_NAME);
  const file = request.nextUrl.searchParams.get("file");
  if (!file) return NextResponse.json({ error: "No file" }, { status: 500 });
  const bucketFile = bucket.file(file);
  const options = {
    expires: Date.now() + 1 * 60 * 1000,
    fields: { "x-goog-meta-test": "data" },
  };
  const [response] = await bucketFile.generateSignedPostPolicyV4(options);
  return NextResponse.json(response, { status: 200 });
}

export async function GET(request: NextRequest) {
  console.log("GET: /api/image/upload");
  const storage = new Storage({
    projectId: GCP_PROJECT_ID,
    credentials: JSON.parse(GCP_CREDENTIALS),
  });
  const fileName = request.nextUrl.searchParams.get("file");
  if (!fileName || fileName === "") {
    NextResponse.json({ error: "file name is empty" }, { status: 400 });
    return;
  }
  const bucket = storage.bucket(GCP_BUCKET_NAME);
  const file = bucket.file(fileName);

  // 有効期間を指定してSigned URLを生成する
  const options = {
    version: "v4" as const,
    action: "read" as const,
    expires: Date.now() + 5 * 60 * 1000, // 5分間有効
  };

  const [url] = await file.getSignedUrl(options);
  return NextResponse.json(url, { status: 200 });
}
