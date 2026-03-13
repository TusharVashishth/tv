import Link from "next/link";
import { Laptop2 } from "lucide-react";
import { getPinnedRepositories } from "@/lib/github";

function RepoIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 fill-current">
      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 fill-current">
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 fill-current">
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </svg>
  );
}

export async function Projects() {
  const projects = await getPinnedRepositories();

  return (
    <section id="projects" className="px-6 py-16 max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 flex items-center gap-4">
          <Laptop2 className="w-10 h-10" />
          Open Source Projects
        </h2>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Synced directly from the repositories pinned on GitHub.
        </p>
      </div>

      <div className="font-[system-ui,sans-serif]">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="text-base font-semibold text-[#1f2328] dark:text-[#f0f6fc]">
            Pinned
          </h3>
          <Link
            href="https://github.com/tusharvashishth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#0969da] transition-colors hover:underline dark:text-[#4493f8]"
          >
            View profile
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.url}
              className="flex min-h-[132px] flex-col rounded-md border border-[#d0d7de] bg-white p-4 text-[#1f2328] shadow-none dark:border-[#30363d] dark:bg-[#0d1117] dark:text-[#f0f6fc]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="shrink-0 text-[#656d76] dark:text-[#7d8590]">
                    <RepoIcon />
                  </span>
                  <div className="min-w-0">
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate text-sm font-semibold text-[#0969da] hover:underline dark:text-[#4493f8]"
                    >
                      {project.name}
                    </Link>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-[#d0d7de] px-2 py-0.5 text-xs leading-4 text-[#656d76] dark:border-[#30363d] dark:text-[#7d8590]">
                  {project.visibility}
                </span>
              </div>

              <p className="mt-4 min-h-10 text-sm leading-5 text-[#656d76] dark:text-[#7d8590]">
                {project.description || "No description provided."}
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 text-xs text-[#656d76] dark:text-[#7d8590]">
                {project.language ? (
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="size-3 rounded-full border border-black/5 dark:border-white/10"
                      style={{
                        backgroundColor: project.languageColor ?? "#8250df",
                      }}
                    />
                    <span>{project.language}</span>
                  </span>
                ) : null}

                {project.stars ? (
                  <span className="inline-flex items-center gap-1">
                    <StarIcon />
                    <span>{project.stars}</span>
                  </span>
                ) : null}

                {project.forks ? (
                  <span className="inline-flex items-center gap-1">
                    <ForkIcon />
                    <span>{project.forks}</span>
                  </span>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
