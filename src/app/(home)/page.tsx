import { Users, BookIcon, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10" />
      <div className="max-w-3xl mx-auto text-center space-y-6 relative">
        <div className="inline-flex items-center gap-2">
          <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span className="text-sm font-medium bg-gradient-to-r from-sky-600 to-blue-950 dark:from-sky-300 dark:to-blue-400 bg-clip-text text-transparent">
            Community
          </span>
        </div>
        <h1 className="text-5xl p-2 md:text-6xl font-bold tracking-tight bg-gradient-to-r from-sky-500 to-blue-950 dark:from-sky-300 dark:to-blue-700 bg-clip-text text-transparent">
          Hytale Modding
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
          Welcome to the Hytale Modding!
          This is an unofficial community for modding Hytale, providing guides, documentation, and resources.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-500/10 to-blue-950/10 dark:from-sky-300/10 dark:to-blue-700/10 border border-sky-500/20 dark:border-sky-300/20 hover:from-sky-100 hover:to-sky-200 dark:hover:from-sky-300/20 dark:hover:to-blue-700/20 hover:border-sky-300 hover:text-sky-900 dark:hover:border-sky-300/40 hover:scale-102 hover:shadow-md hover:shadow-sky-200/30 dark:hover:shadow-sky-300/20 transition-all duration-150 ease-out"
          >
            <BookIcon className="w-4 h-4 text-sky-600 dark:text-sky-400 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm font-medium bg-gradient-to-r from-sky-600 to-blue-950 dark:from-sky-300 dark:to-blue-400 bg-clip-text text-transparent">
              Documentation
            </span>
          </Link>
          <a
            href="https://discord.gg/54WX832HBM"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-500/10 to-blue-950/10 dark:from-sky-300/10 dark:to-blue-700/10 border border-sky-500/20 dark:border-sky-300/20 hover:from-sky-100 hover:to-sky-200 dark:hover:from-sky-300/20 dark:hover:to-blue-700/20 hover:border-sky-300 hover:text-sky-900 dark:hover:border-sky-300/40 hover:scale-102 hover:shadow-md hover:shadow-sky-200/30 dark:hover:shadow-sky-300/20 transition-all duration-150 ease-out"
          >
            <MessageCircle className="w-4 h-4 text-sky-600 dark:text-sky-400 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm font-medium bg-gradient-to-r from-sky-600 to-blue-950 dark:from-sky-300 dark:to-blue-400 bg-clip-text text-transparent">
              Discord
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
