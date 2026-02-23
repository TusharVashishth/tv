"use client";

import { motion } from "framer-motion";
import { Play, Youtube as YoutubeIcon, Users } from "lucide-react";
import Link from "next/link";

const recentVideos = [
  {
    id: "1",
    title: "Build a Fullstack Next.js App from Scratch",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    views: "15K",
    date: "2 weeks ago",
  },
  {
    id: "2",
    title: "Mastering Node.js Microservices",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    views: "22K",
    date: "1 month ago",
  },
  {
    id: "3",
    title: "Deploying AWS Lambda with Serverless Framework",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    views: "18K",
    date: "2 months ago",
  },
];

export function YouTube() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8"
      >
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500 mb-4 flex items-center gap-4">
            <YoutubeIcon className="w-10 h-10 text-red-500" />
            YouTube Channel
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg">
            Educating developers on building real-world applications using best
            practices. In-depth tutorials on Next.js, Node.js, Laravel, and
            modern tools.
          </p>
        </div>

        <div className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-teal-400" />
              10K+
            </span>
            <span className="text-sm text-gray-400 uppercase tracking-wider mt-1">
              Subscribers
            </span>
          </div>
          <div className="w-px h-12 bg-white/10"></div>
          <Link
            href="https://www.youtube.com/@tusharvashishth"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            Subscribe
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-red-500/50 transition-colors"
          >
            <div className="aspect-video relative overflow-hidden bg-gray-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-red-400 transition-colors">
                {video.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{video.views} views</span>
                <span>{video.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
