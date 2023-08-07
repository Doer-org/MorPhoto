import { readMorphoto } from "@/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.url.split("/").pop() as string;
  const data = await readMorphoto(id);
  return NextResponse.json(data);
}
