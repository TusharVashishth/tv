import { Play, Youtube as YoutubeIcon } from "lucide-react";
import Link from "next/link";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import Image from "next/image";
import { getLatestVideos, VideoItem } from "@/lib/youtube";

export async function YouTube() {
  const recentVideos = await getLatestVideos();
  const topRow = recentVideos.filter((_, index) => index % 2 === 0);
  const bottomRowSource = recentVideos.filter((_, index) => index % 2 !== 0);
  const bottomRow = bottomRowSource.length > 0 ? bottomRowSource : topRow;

  const renderCard = (video: VideoItem) => (
    <Link
      key={video.id}
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group w-85 rounded-2xl overflow-hidden border border-border bg-card hover:bg-accent/60 transition-colors"
    >
      <div className="aspect-video relative overflow-hidden bg-muted">
        <Image
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          height={300}
          width={300}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
            <Play className="w-6 h-6 text-primary-foreground ml-1" />
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold line-clamp-2">{video.title}</h3>
      </div>
    </Link>
  );

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 flex items-center gap-4">
            <YoutubeIcon className="w-10 h-10" />
            YouTube Channel
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Fresh uploads from{" "}
            <span className="text-foreground font-semibold">
              codingWithTushar
            </span>
            .
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card px-5 py-4 min-w-55">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Subscribers
          </p>
          <p className="text-3xl font-bold text-foreground mt-1">
            <NumberTicker value={10755} />+
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <Marquee pauseOnHover className="[--duration:48s]">
          {topRow.map(renderCard)}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:52s]">
          {bottomRow.map(renderCard)}
        </Marquee>
      </div>
    </section>
  );
}
