import { NextResponse } from "next/server";
import { getLatestVideos } from "@/lib/youtube";

export async function GET() {
    const videos = await getLatestVideos();

    return NextResponse.json({ videos });
}
