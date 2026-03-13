export type VideoItem = {
    id: string;
    title: string;
    thumbnail: string;
    url: string;
};

export type TextRenderer =
    | {
        simpleText?: string;
        runs?: Array<{ text?: string }>;
    }
    | undefined;

export type YouTubeVideoRenderer = {
    videoId?: string;
    title?: TextRenderer;
};


export const fallbackVideos = [
    {
        id: "1",
        title: "Build a Fullstack Next.js App from Scratch",
        thumbnail:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
        url: "https://www.youtube.com/@codingWithTushar",
    },
    {
        id: "2",
        title: "Mastering Node.js Microservices",
        thumbnail:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        url: "https://www.youtube.com/@codingWithTushar",
    },
    {
        id: "3",
        title: "Deploying AWS Lambda with Serverless Framework",
        thumbnail:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
        url: "https://www.youtube.com/@codingWithTushar",
    },
];


export function getTextContent(textRenderer: TextRenderer): string {
    if (!textRenderer) {
        return "";
    }

    if (textRenderer.simpleText) {
        return textRenderer.simpleText.trim();
    }

    return (
        textRenderer.runs
            ?.map((run) => run.text ?? "")
            .join("")
            .trim() ?? ""
    );
}

export function extractInitialData(html: string): unknown {
    const marker = "var ytInitialData = ";
    const start = html.indexOf(marker);

    if (start === -1) {
        return null;
    }

    let cursor = html.indexOf("{", start);

    if (cursor === -1) {
        return null;
    }

    let depth = 0;
    let inString = false;
    let isEscaped = false;
    const jsonStart = cursor;

    for (; cursor < html.length; cursor += 1) {
        const character = html[cursor];

        if (inString) {
            if (isEscaped) {
                isEscaped = false;
                continue;
            }

            if (character === "\\") {
                isEscaped = true;
                continue;
            }

            if (character === '"') {
                inString = false;
            }

            continue;
        }

        if (character === '"') {
            inString = true;
            continue;
        }

        if (character === "{") {
            depth += 1;
            continue;
        }

        if (character === "}") {
            depth -= 1;

            if (depth === 0) {
                const json = html.slice(jsonStart, cursor + 1);
                return JSON.parse(json);
            }
        }
    }

    return null;
}

export function collectVideoRenderers(node: unknown, videos: YouTubeVideoRenderer[]) {
    if (!node || typeof node !== "object") {
        return;
    }

    if (Array.isArray(node)) {
        node.forEach((item) => collectVideoRenderers(item, videos));
        return;
    }

    if ("videoRenderer" in node) {
        const videoRenderer = (node as { videoRenderer?: YouTubeVideoRenderer })
            .videoRenderer;

        if (videoRenderer) {
            videos.push(videoRenderer);
        }
    }

    Object.values(node).forEach((value) => collectVideoRenderers(value, videos));
}

export function parseYouTubeChannelPage(html: string): VideoItem[] {
    const initialData = extractInitialData(html);

    if (!initialData) {
        return [];
    }

    const videoRenderers: YouTubeVideoRenderer[] = [];
    const seenVideoIds = new Set<string>();
    collectVideoRenderers(initialData, videoRenderers);

    return videoRenderers
        .map((video) => {
            const videoId = video.videoId ?? "";
            const title = getTextContent(video.title);

            if (!videoId || !title || seenVideoIds.has(videoId)) {
                return null;
            }

            seenVideoIds.add(videoId);

            return {
                id: videoId,
                title,
                thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                url: `https://www.youtube.com/watch?v=${videoId}`,
            };
        })
        .filter((video): video is VideoItem => Boolean(video));
}

export async function getLatestVideos(): Promise<VideoItem[]> {
    try {
        const response = await fetch(
            "https://www.youtube.com/@codingWithTushar/videos",
            {
                headers: {
                    "Accept-Language": "en-US,en;q=0.9",
                },
                next: { revalidate: 900 },
            },
        );

        if (!response.ok) {
            return fallbackVideos;
        }

        const html = await response.text();
        const videos = parseYouTubeChannelPage(html).slice(0, 8);
        return videos.length > 0 ? videos : fallbackVideos;
    } catch {
        return fallbackVideos;
    }
}