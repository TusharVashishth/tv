export type VideoItem = {
    id: string;
    title: string;
    thumbnail: string;
    url: string;
};

// ***** client-safe fetch — calls the internal API route *****
export async function fetchLatestVideos(): Promise<VideoItem[]> {
    const response = await fetch("/api/youtube");

    if (!response.ok) return fallbackVideos;

    const data: { videos: VideoItem[] } = await response.json();
    return data.videos?.length > 0 ? data.videos : fallbackVideos;
}


export const fallbackVideos = [
    {
        id: "1",
        title: "Build a Fullstack Next.js App from Scratch",
        thumbnail:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
        url: "https://www.youtube.com/@tushar.vashishth",
    },
    {
        id: "2",
        title: "Mastering Node.js Microservices",
        thumbnail:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        url: "https://www.youtube.com/@tushar.vashishth",
    },
    {
        id: "3",
        title: "Deploying AWS Lambda with Serverless Framework",
        thumbnail:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
        url: "https://www.youtube.com/@tushar.vashishth",
    },
];


type ChannelApiResponse = {
    items?: Array<{
        contentDetails?: {
            relatedPlaylists?: { uploads?: string };
        };
    }>;
};

type PlaylistApiResponse = {
    items?: Array<{
        snippet?: {
            title?: string;
            resourceId?: { videoId?: string };
            thumbnails?: {
                high?: { url?: string };
                medium?: { url?: string };
                default?: { url?: string };
            };
        };
    }>;
};

// ***** fetch the uploads playlist ID for @tushar.vashishth (cached 24h) *****
async function getUploadsPlaylistId(apiKey: string): Promise<string | null> {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=tushar.vashishth&key=${apiKey}`;
    const response = await fetch(url, { next: { revalidate: 86400 } });

    if (!response.ok) return null;

    const data: ChannelApiResponse = await response.json();
    return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null;
}

export async function getLatestVideos(): Promise<VideoItem[]> {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) return fallbackVideos;

    try {
        const playlistId = await getUploadsPlaylistId(apiKey);

        if (!playlistId) return fallbackVideos;

        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=8&key=${apiKey}`;
        const response = await fetch(url, { next: { revalidate: 900 } });

        if (!response.ok) return fallbackVideos;

        const data: PlaylistApiResponse = await response.json();

        const videos: VideoItem[] = (data.items ?? [])
            .map((item) => {
                const snippet = item.snippet;
                const videoId = snippet?.resourceId?.videoId;
                const title = snippet?.title;

                if (!videoId || !title) return null;

                return {
                    id: videoId,
                    title,
                    thumbnail:
                        snippet?.thumbnails?.high?.url ??
                        snippet?.thumbnails?.medium?.url ??
                        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                    url: `https://www.youtube.com/watch?v=${videoId}`,
                };
            })
            .filter((v): v is VideoItem => Boolean(v));

        return videos.length > 0 ? videos : fallbackVideos;
    } catch {
        return fallbackVideos;
    }
}