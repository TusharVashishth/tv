import "server-only";

export type PinnedRepository = {
  name: string;
  description: string;
  language: string | null;
  languageColor: string | null;
  stars: string | null;
  forks: string | null;
  url: string;
  visibility: string;
};

const githubUsername = process.env.GITHUB_USERNAME ?? "tusharvashishth";

const fallbackPinnedRepositories: PinnedRepository[] = [
  {
    name: "localCV",
    description:
      "localCV is an open source, local-first AI resume maker built for people who want a faster way to create ATS-ready resumes without giving up control of their data.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: "18",
    forks: "5",
    url: "https://github.com/tusharvashishth/localcv",
    visibility: "Public",
  },
  {
    name: "Threads_clone",
    description: "Threads clone built with full-stack TypeScript architecture.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: "18",
    forks: "5",
    url: "https://github.com/tusharvashishth/Threads_clone",
    visibility: "Public",
  },
  {
    name: "Nextjs_Authentication",
    description: "Production-ready Next.js authentication flow and auth utilities.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: "14",
    forks: "9",
    url: "https://github.com/tusharvashishth/Nextjs_Authentication",
    visibility: "Public",
  },
  {
    name: "threads_app_clone",
    description: "Mobile-first social feed clone with real-time interactions.",
    language: "Dart",
    languageColor: "#00B4AB",
    stars: "7",
    forks: "7",
    url: "https://github.com/tusharvashishth/threads_app_clone",
    visibility: "Public",
  },
  {
    name: "daily-dev-clone",
    description:
      "Daily.dev style experience with Laravel + Next.js and Reverb realtime updates.",
    language: "PHP",
    languageColor: "#4F5D95",
    stars: "36",
    forks: "20",
    url: "https://github.com/tusharvashishth/daily-dev-clone",
    visibility: "Public",
  },
  {
    name: "Devops",
    description:
      "CI/CD deployment workflow for shipping full-stack projects to production.",
    language: "YAML",
    languageColor: "#cb171e",
    stars: "14",
    forks: "16",
    url: "https://github.com/tusharvashishth/Devops",
    visibility: "Public",
  },
];

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&nbsp;/g, " ");
}

function stripTags(value: string): string {
  return decodeHtmlEntities(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function extractMatch(source: string, expression: RegExp): string | null {
  const match = source.match(expression);
  return match?.[1] ? stripTags(match[1]) : null;
}

export function parsePinnedRepositories(html: string): PinnedRepository[] {
  const itemMatches = html.match(
    /<li[^>]*pinned-item-list-item[\s\S]*?<\/li>/g,
  );

  if (!itemMatches) {
    return [];
  }

  return itemMatches
    .map((item) => {
      const repositoryPath = item.match(
        /href="\/([^"/]+)\/([^"/?#]+)"/,
      );

      if (!repositoryPath) {
        return null;
      }

      const owner = repositoryPath[1];
      const repositorySlug = repositoryPath[2];
      const repoName = extractMatch(item, /<span class="repo">([\s\S]*?)<\/span>/);

      if (!repoName) {
        return null;
      }

      const stars = extractMatch(
        item,
        /href="\/[^"]+\/stargazers"[\s\S]*?>([\s\S]*?)<\/a>/,
      );
      const forks = extractMatch(
        item,
        /href="\/[^"]+\/forks"[\s\S]*?>([\s\S]*?)<\/a>/,
      );

      return {
        name: repoName,
        description:
          extractMatch(
            item,
            /<p class="pinned-item-desc[^"]*">([\s\S]*?)<\/p>/,
          ) ?? "",
        language:
          extractMatch(
            item,
            /<span itemprop="programmingLanguage">([\s\S]*?)<\/span>/,
          ) ?? null,
        languageColor:
          item.match(
            /<span class="repo-language-color" style="background-color:\s*([^"]+)"/,
          )?.[1] ?? null,
        stars: stars?.replace(/^stars\s*/i, "") ?? null,
        forks: forks?.replace(/^forks\s*/i, "") ?? null,
        url: `https://github.com/${owner}/${repositorySlug}`,
        visibility:
          extractMatch(item, /<span class="Label[^"]*">([\s\S]*?)<\/span>/) ??
          "Public",
      };
    })
    .filter((repository): repository is PinnedRepository => Boolean(repository));
}

export async function getPinnedRepositories(): Promise<PinnedRepository[]> {
  try {
    const response = await fetch(`https://github.com/${githubUsername}`, {
      headers: {
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent": "Mozilla/5.0",
      },
      cache: "force-cache",
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return fallbackPinnedRepositories;
    }

    const html = await response.text();
    const repositories = parsePinnedRepositories(html);

    return repositories.length > 0
      ? repositories
      : fallbackPinnedRepositories;
  } catch {
    return fallbackPinnedRepositories;
  }
}
