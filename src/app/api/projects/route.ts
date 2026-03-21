import { NextResponse } from "next/server";
import { getPinnedRepositories } from "@/lib/github";

export async function GET() {
  const projects = await getPinnedRepositories();

  return NextResponse.json({ projects });
}
