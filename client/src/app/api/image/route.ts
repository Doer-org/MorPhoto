import { env } from "@/constants/env";
import { Storage } from "@google-cloud/storage";
import { NextRequest, NextResponse } from "next/server";

const { GCP_PROJECT_ID, GCP_BUCKET_NAME, GCP_CREDENTIALS } = env;

export async function POST(request: NextRequest) {
  const storage = new Storage({
    projectId: GCP_PROJECT_ID,
    credentials: JSON.parse(GCP_CREDENTIALS),
  });
  const bucket = storage.bucket(GCP_BUCKET_NAME);
  const file = request.nextUrl.searchParams.get("file");
  if (!file) return NextResponse.json({ error: "No file" }, { status: 500 });
  const bucketFile = bucket.file(file);
  const options = {
    expires: Date.now() + 1 * 60 * 1000,
    fields: { "x-goog-meta-test": "data" },
  };
  const [response] = await bucketFile.generateSignedPostPolicyV4(options);

  // console.log(response);
  //   return NextResponse.json({ data: response }, { status: 200 });
  // console.log(GCP_BUCKET_NAME, GCP_CREDENTIALS, GCP_PROJECT_ID);
  console.log("api: /api/image/upload");
  console.log(response);
  return NextResponse.json(response, { status: 200 });
}
