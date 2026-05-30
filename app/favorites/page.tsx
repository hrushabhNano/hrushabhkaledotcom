"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { favorites, Favorite, Category } from "@/data/favorites";
import { ChevronDown, Search } from "lucide-react";
import Container from "@/components/container";
import { Subheading } from "@/components/subheading";

// Cache for OG images to avoid refetching
const ogImageCache: Record<string, { image: string | null; loading: boolean }> = {};

// Prefetch OG image for a URL
async function prefetchOgImage(url: string): Promise<string | null> {
  if (ogImageCache[url]) {
    return ogImageCache[url].image;
  }

  ogImageCache[url] = { image: null, loading: true };

  try {
    const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
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
    <div className='relative shrink-0 size-4 text-foreground/50'>
      <Search size={16} strokeWidth={1.5} className={isHovered ? "text-foreground" : ""} />
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
  const categories: FilterCategory[] = ["All", "Product", "People", "Site", "Font", "Movie", "Creator"];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    <div className='flex gap-4 items-center relative shrink-0 w-full mb-8' role='search'>
      {/* Search Input */}
      <div
        className='basis-0 flex gap-3 grow items-center min-h-px min-w-px relative shrink-0'
        onMouseEnter={() => setIsInputHovered(true)}
        onMouseLeave={() => setIsInputHovered(false)}>
        <SearchIcon isHovered={isInputHovered || isInputFocused} />
        <input
          id='search-favorites'
          type='search'
          placeholder='Search links'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          className='font-normal relative shrink-0 text-sm text-justify bg-transparent border-none outline-none text-foreground placeholder:text-foreground/40 w-full'
          aria-label='Search favorites'
        />
      </div>

      {/* Filter Dropdown */}
      <div className='relative z-50' ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className='flex gap-1 items-center justify-center relative shrink-0 bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity px-2 py-1 -mx-2 -my-1'
          aria-label='Filter by category'
          aria-haspopup='true'
          aria-expanded={showDropdown}>
          <p className='font-medium relative shrink-0 text-foreground text-sm text-justify text-nowrap whitespace-pre'>
            {selectedCategory === "All" ? "All" : selectedCategory + "s"}
          </p>
          <ChevronDown className='size-4 text-foreground/70' strokeWidth={1.5} />
        </button>

        {showDropdown && (
          <div
            className='absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg py-1 z-50 min-w-32'
            role='menu'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowDropdown(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors ${
                  selectedCategory === category
                    ? "font-medium text-foreground bg-neutral-100 dark:bg-neutral-800"
                    : "text-foreground/60 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
                }`}
                role='menuitem'
                aria-current={selectedCategory === category}>
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
    <div className='relative w-full py-1'>
      {/* OG Image Preview - outside the anchor to avoid opacity inheritance */}
      <div
        className={`absolute right-[105%] hidden md:block top-1/2 -translate-y-1/2 z-50 pointer-events-none transition-all duration-200 ease-out ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
        style={{ height: "120px" }}>
        {isLoading ? (
          <div className='h-[120px] w-40 bg-neutral-100 dark:bg-neutral-800 rounded-xl animate-pulse flex items-center justify-center'>
            <div className='size-6 border-2 border-neutral-300 dark:border-neutral-600 border-t-transparent rounded-full animate-spin' />
          </div>
        ) : ogImage ? (
          <img
            src={ogImage}
            alt={`${favorite.name} preview`}
            className='h-[120px] w-auto max-w-60 object-contain rounded-xl border border-border bg-card shadow-xl'
          />
        ) : null}
      </div>

      <a
        href={favorite.url}
        target='_blank'
        rel={`noopener noreferrer${favorite.nofollow === false ? "" : " nofollow"}`}
        className='flex gap-4 items-center relative shrink-0 w-full group py-2'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div className='basis-0 flex gap-4 grow items-center min-h-px min-w-px relative shrink-0'>
          <div className='relative shrink-0 size-5 flex items-center justify-center rounded overflow-hidden bg-foreground/5'>
            <img
              alt={`${favorite.name} favicon`}
              className='max-w-none object-cover pointer-events-none size-4'
              src={getFaviconUrl(favorite.url)}
              onError={(e) => {
                // Hide if favicon fails to load
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <div className='basis-0 flex flex-wrap gap-x-2 gap-y-0.5 grow items-baseline min-h-px min-w-px relative shrink-0'>
            <p className='font-semibold relative shrink-0 text-foreground text-sm text-justify whitespace-pre group-hover:underline underline-offset-4'>
              {favorite.name}
            </p>
            <p className='relative shrink-0 text-xs text-justify text-nowrap text-foreground/40 whitespace-pre hidden sm:block'>
              /
            </p>
            <p className='[white-space-collapse:collapse] basis-0 grow min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-foreground/70 text-sm text-justify text-nowrap'>
              {favorite.description}
            </p>
          </div>
        </div>
        <p className='hidden sm:block relative shrink-0 text-xs text-nowrap text-foreground/40 whitespace-pre font-mono'>
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
      <div className='flex items-center justify-center py-8 w-full'>
        <p className='text-sm text-foreground/50'>No favorites found</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-start relative shrink-0 w-full isolate divide-y divide-border/40'>
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
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("All");

  return (
    <Container className="min-h-screen pb-20">
      <Subheading className="mt-4">Favorites</Subheading>
      <p className="text-foreground pt-4 text-base">
        A curated collection of beautifully designed products, inspiring people, and websites that have caught my attention.
      </p>

      <div className="mt-12 flex flex-col w-full relative">
        <div className='w-full relative z-50'>
          <SearchAndFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div className='w-full relative z-10'>
          <FavoritesList searchQuery={searchQuery} selectedCategory={selectedCategory} />
        </div>
      </div>
    </Container>
  );
}
