"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rocket, Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

const Header = () => {
  const pathname = usePathname();
  const { favoriteIds } = useFavorites();

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 border-b border-space-blue/40 bg-space-black/90 backdrop-blur-sm"
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3"
      >
        <Link
          href="/"
          aria-label="SpaceX Explorer home"
          className="flex items-center gap-2 text-lg font-bold tracking-wider text-white hover:text-space-silver transition-colors"
        >
          <Rocket className="h-5 w-5 text-space-accent" aria-hidden="true" />
          SPACEX
        </Link>

        <ul role="list" className="flex items-center gap-1">
          <li>
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "bg-space-accent/20 text-white"
                  : "text-space-silver hover:bg-space-blue/30 hover:text-white"
              }`}
            >
              Launches
            </Link>
          </li>
          <li>
            <Link
              href="/favorites"
              aria-current={pathname === "/favorites" ? "page" : undefined}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === "/favorites"
                  ? "bg-space-accent/20 text-white"
                  : "text-space-silver hover:bg-space-blue/30 hover:text-white"
              }`}
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              Favorites
              {favoriteIds.length > 0 && (
                <span
                  aria-label={`${favoriteIds.length} saved`}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-space-accent text-xs text-white"
                >
                  {favoriteIds.length}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
