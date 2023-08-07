import { readAllMorphotos } from "@/api";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await readAllMorphotos();
  return NextResponse.json(data);
}
