import { Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Plywoods",
    image: "/ShopByCategory/plywood.jpg",
  },
  {
    id: 10,
    name: "Block Boards",
    image: "/ShopByCategory/block_boards.png",
  },
  {
    id: 11,
    name: "Flush Doors",
    image: "/ShopByCategory/flush_doors.png",
  },
  {
    id: 2,
    name: "Laminates",
    image: "/ShopByCategory/laminates.png",
  },
  {
    id: 3,
    name: "Kitchen Fittings",
    image: "/ShopByCategory/kitchen_fittings.png",
  },
  {
    id: 4,
    name: "High-End Locks",
    image: "/ShopByCategory/highend_locks.png",
  },
  {
    id: 5,
    name: "Safes & Security",
    image: "/ShopByCategory/safes.jpg",
  },
  {
    id: 6,
    name: "Rafters",
    image: "/ShopByCategory/rafters.png",
  },
  {
    id: 7,
    name: "MDF/HDHMR",
    image: "/ShopByCategory/MDF.png",
  },
  {
    id: 8,
    name: "Adhesive",
    image: "/ShopByCategory/adhesives.jpg",
  },
  {
    id: 9,
    name: "Hardware",
    image: "/ShopByCategory/hardwares.jpg",
  },
];

// --- 1. EXISTING SIMPLE LIST (NEEDED FOR SEARCH) ---
export const BRANDS = [
  "Hafele",
  "Blum",
  "Greenply",
  "CenturyPly",
  "Godrej",
  "Europa",
  "Hettich",
];

// --- 2. NEW LIST WITH IMAGES (NEEDED FOR HOMEPAGE) ---
export const FEATURED_BRANDS = [
  {
    name: "Hafele",
    image: "/ShopByCategory/hafele_logo.png",
  },
  {
    name: "Blum",
    image: "/ShopByCategory/blum_logo.png",
  },
  {
    name: "Greenply",
    image: "/greenply_logo.png",
  },
  {
    name: "CenturyPly",
    image: "/centuryply-logo.png",
  },
  {
    name: "Godrej",
    image: "/godrej_logo.jpg",
  },
  {
    name: "Europa",
    image: "/europalocks_logo.jpg",
  },
  {
    name: "Hettich",
    image: "/hettich_logo.png",
  },
];

export const BRAND_DESCRIPTIONS: Record<string, string> = {
  Hafele:
    "Explore the exclusive collection of Hafele products at VIP Online. Known for German engineering and precision, Hafele offers premium architectural hardware, kitchen fittings, and furniture fittings.",
  Blum: "Discover Blum's innovative lift systems, hinge systems, and pull-out systems. Blum is synonymous with high-quality motion technologies that bring convenience to furniture.",
  Greenply:
    "Greenply is India's leading plywood brand, offering superior quality plywood, blockboards, and flush doors. Perfect for both residential and commercial projects.",
  CenturyPly:
    "Buy CenturyPly products online at best prices. Synonymous with strength and durability, CenturyPly offers a wide range of plywood, laminates, and veneers.",
  Godrej:
    "Secure your home with Godrej's advanced locking solutions and safes. From biometric safes to high-security rim locks, Godrej provides peace of mind.",
  Europa:
    "Europa locks are designed for maximum security and ease of use. Browse our range of Europa main door locks, padlocks, and antique finish handles.",
  Hettich:
    "Hettich is one of the world's largest manufacturers of furniture fittings. Explore our range of Hettich hinges, drawer systems, and sliding door channels.",
};
