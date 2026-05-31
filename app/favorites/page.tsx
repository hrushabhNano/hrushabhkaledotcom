"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { favorites, Favorite, Category } from "@/data/favorites";
import { ChevronDown, Search } from "lucide-react";
import Container from "@/components/container";
import { Subheading } from "@/components/subheading";

// Cache for OG images to avoid refetching
const ogImageCache: Record<string, { image: string | null; loading: boolean }> =
  {};

// Prefetch OG image for a URL
async function prefetchOgImage(url: string): Promise<string | null> {
  if (ogImageCache[url]) {
    return ogImageCache[url].image;
  }

  ogImageCache[url] = { image: null, loading: true };

  try {
    const response = await fetch(
      `https://api.microlink.io/?url=${encodeURIComponent(url)}`,
    );
    const data = await response.json();
    const imageUrl = data?.data?.image?.url || data?.data?.logo?.url || null;
    ogImageCache[url] = { image: imageUrl, loading: false };
    return imageUrl;
  } catch {
    ogImageCache[url] = { image: null, loading: false };
    return null;
  }
}

// Prefetch all favorites' OG images in background
let prefetchStarted = false;
function prefetchAllOgImages() {
  if (prefetchStarted) return;
  prefetchStarted = true;

  // Stagger requests to avoid rate limiting (50ms between each)
  favorites.forEach((fav, index) => {
    setTimeout(() => {
      prefetchOgImage(fav.url);
    }, index * 50);
  });
}

type FilterCategory = "All" | Category;

function SearchIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="text-foreground/50 relative size-4 shrink-0">
      <Search
        size={16}
        strokeWidth={1.5}
        className={isHovered ? "text-foreground" : ""}
      />
    </div>
  );
}

function SearchAndFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: FilterCategory;
  setSelectedCategory: (category: FilterCategory) => void;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categories: FilterCategory[] = [
    "All",
    "Product",
    "People",
    "Site",
    "Font",
    "Movie",
    "Creator",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div
      className="relative mb-8 flex w-full shrink-0 items-center gap-4"
      role="search"
    >
      {/* Search Input */}
      <div
        className="relative flex min-h-px min-w-px shrink-0 grow basis-0 items-center gap-3"
        onMouseEnter={() => setIsInputHovered(true)}
        onMouseLeave={() => setIsInputHovered(false)}
      >
        <SearchIcon isHovered={isInputHovered || isInputFocused} />
        <input
          id="search-favorites"
          type="search"
          placeholder="Search links"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          className="text-foreground placeholder:text-foreground/40 relative w-full shrink-0 border-none bg-transparent text-justify text-sm font-normal outline-none"
          aria-label="Search favorites"
        />
      </div>

      {/* Filter Dropdown */}
      <div className="relative z-50" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="relative -mx-2 -my-1 flex shrink-0 cursor-pointer items-center justify-center gap-1 border-none bg-transparent px-2 py-1 transition-opacity hover:opacity-70"
          aria-label="Filter by category"
          aria-haspopup="true"
          aria-expanded={showDropdown}
        >
          <p className="text-foreground relative shrink-0 text-justify text-sm font-medium text-nowrap whitespace-pre">
            {selectedCategory === "All" ? "All" : selectedCategory + "s"}
          </p>
          <ChevronDown
            className="text-foreground/70 size-4"
            strokeWidth={1.5}
          />
        </button>

        {showDropdown && (
          <div
            className="bg-card border-border absolute top-full right-0 z-50 mt-2 min-w-32 rounded-lg border py-1 shadow-lg"
            role="menu"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowDropdown(false);
                }}
                className={`w-full cursor-pointer px-4 py-2 text-left text-sm transition-colors ${
                  selectedCategory === category
                    ? "text-foreground bg-neutral-100 font-medium dark:bg-neutral-800"
                    : "text-foreground/60 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
                }`}
                role="menuitem"
                aria-current={selectedCategory === category}
              >
                {category === "All" ? "All" : category + "s"}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FavoriteItem({
  favorite,
  getDomain,
  getFaviconUrl,
}: {
  favorite: Favorite;
  getDomain: (url: string) => string;
  getFaviconUrl: (url: string) => string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [ogImage, setOgImage] = useState<string | null>(() => {
    // Initialize from cache if available
    const cached = ogImageCache[favorite.url];
    return cached && !cached.loading ? cached.image : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    // Shorter delay since images are likely prefetched
    hoverTimeoutRef.current = setTimeout(async () => {
      setIsHovered(true);

      // Check cache first
      const cached = ogImageCache[favorite.url];
      if (cached && !cached.loading) {
        setOgImage(cached.image);
        return;
      }

      // If not in cache or still loading, fetch it
      setIsLoading(true);
      const image = await prefetchOgImage(favorite.url);
      setOgImage(image);
      setIsLoading(false);
    }, 100);
  }, [favorite.url]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full py-1">
      {/* OG Image Preview - outside the anchor to avoid opacity inheritance */}
      <div
        className={`pointer-events-none absolute top-1/2 right-[105%] z-50 hidden -translate-y-1/2 transition-all duration-200 ease-out md:block ${
          isHovered ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
        }`}
        style={{ height: "120px" }}
      >
        {isLoading ? (
          <div className="flex h-[120px] w-40 animate-pulse items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <div className="size-6 animate-spin rounded-full border-2 border-neutral-300 border-t-transparent dark:border-neutral-600" />
          </div>
        ) : ogImage ? (
          <img
            src={ogImage}
            alt={`${favorite.name} preview`}
            className="border-border bg-card h-[120px] w-auto max-w-60 rounded-xl border object-contain shadow-xl"
          />
        ) : null}
      </div>

      <a
        href={favorite.url}
        target="_blank"
        rel={`noopener noreferrer${favorite.nofollow === false ? "" : " nofollow"}`}
        className="group relative flex w-full shrink-0 items-center gap-4 py-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative flex min-h-px min-w-px shrink-0 grow basis-0 items-center gap-4">
          <div className="bg-foreground/5 relative flex size-5 shrink-0 items-center justify-center overflow-hidden rounded">
            <img
              alt={`${favorite.name} favicon`}
              className="pointer-events-none size-4 max-w-none object-cover"
              src={getFaviconUrl(favorite.url)}
              onError={(e) => {
                // Hide if favicon fails to load
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="relative flex min-h-px min-w-px shrink-0 grow basis-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <p className="text-foreground relative shrink-0 text-justify text-sm font-semibold whitespace-pre underline-offset-4 group-hover:underline">
              {favorite.name}
            </p>
            <p className="text-foreground/40 relative hidden shrink-0 text-justify text-xs text-nowrap whitespace-pre sm:block">
              /
            </p>
            <p className="text-foreground/70 relative min-h-px min-w-px shrink-0 grow basis-0 overflow-hidden text-justify text-sm text-nowrap overflow-ellipsis [white-space-collapse:collapse]">
              {favorite.description}
            </p>
          </div>
        </div>
        <p className="text-foreground/40 relative hidden shrink-0 font-mono text-xs text-nowrap whitespace-pre sm:block">
          {getDomain(favorite.url)}
        </p>
      </a>
    </div>
  );
}

function FavoritesList({
  searchQuery,
  selectedCategory,
}: {
  searchQuery: string;
  selectedCategory: FilterCategory;
}) {
  // Prefetch all OG images on mount
  useEffect(() => {
    // Small delay to not block initial render
    const timer = setTimeout(prefetchAllOgImages, 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredFavorites = useMemo(() => {
    let filtered = favorites;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((fav) => fav.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (fav) =>
          fav.name.toLowerCase().includes(query) ||
          fav.description.toLowerCase().includes(query) ||
          fav.url.toLowerCase().includes(query),
      );
    }

    // Sort alphabetically by name
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, selectedCategory]);

  const getDomain = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  const getFaviconUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return "";
    }
  };

  if (filteredFavorites.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-8">
        <p className="text-foreground/50 text-sm">No favorites found</p>
      </div>
    );
  }

  return (
    <div className="divide-border/40 relative isolate flex w-full shrink-0 flex-col items-start divide-y">
      {filteredFavorites.map((favorite) => (
        <FavoriteItem
          key={favorite.id}
          favorite={favorite}
          getDomain={getDomain}
          getFaviconUrl={getFaviconUrl}
        />
      ))}
    </div>
  );
}

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("All");

  return (
    <Container className="min-h-screen pb-20">
      <Subheading className="mt-4">Favorites</Subheading>
      <p className="text-foreground pt-4 text-base">
        A curated collection of beautifully designed products, inspiring people,
        and websites that have caught my attention.
      </p>

      <div className="relative mt-12 flex w-full flex-col">
        <div className="relative z-50 w-full">
          <SearchAndFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div className="relative z-10 w-full">
          <FavoritesList
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </Container>
  );
}
