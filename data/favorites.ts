export type Category = "Product" | "People" | "Site" | "Font" | "Movie" | "Creator";

export interface Favorite {
  id: string;
  name: string;
  url: string;
  description: string;
  category: Category;
  nofollow?: boolean;
}

export const favorites: Favorite[] = [
  // From Akash's Profile
  {
    id: "anthropic",
    name: "Anthropic",
    url: "https://www.anthropic.com",
    description: "AI company I trust",
    category: "Product",
  },
  {
    id: "granola",
    name: "Granola",
    url: "https://granola.ai",
    description: "My companion in all sales calls",
    category: "Product",
  },
  {
    id: "geist-sans",
    name: "Geist & Geist Mono",
    url: "https://vercel.com/font",
    description: "Product font I blindly use",
    category: "Font",
  },
  {
    id: "dieter-rams",
    name: "Dieter Rams",
    url: "https://www.rams-foundation.org/",
    description: "My source of inspiration",
    category: "People",
  },
  
  // From Manu's Profile
  {
    id: "fireship",
    name: "Fireship",
    url: "https://fireship.io",
    description: "Fast-paced, highly entertaining tech news and code tutorials",
    category: "Creator",
  },
  {
    id: "naval",
    name: "Naval",
    url: "https://nav.al",
    description: "Entrepreneur and philosopher. Profound thoughts on wealth and happiness",
    category: "People",
  },

  // Extras
  {
    id: "cursor",
    name: "Cursor",
    url: "https://cursor.sh",
    description: "AI-first code editor that feels like magic",
    category: "Product",
  },
  {
    id: "shadcn",
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    description: "Beautifully designed components that you can copy and paste",
    category: "Site",
  },
  {
    id: "nextjs",
    name: "Next.js",
    url: "https://nextjs.org",
    description: "The React Framework for the Web",
    category: "Product",
  },
];
