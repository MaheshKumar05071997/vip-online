// --- 1. DEFINITIONS ---
export interface Variant {
  name: string;
  image: string;
  price?: number;
  originalPrice?: number;
  thickness?: string[];
  sizes?: string[];
  specs?: Record<string, string>;
  priceList?: Record<string, { price: string; originalPrice?: string }>;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  variants?: Variant[];
  specs?: { key: string; value: string }[];
  variantName?: string;
}

export interface Category {
  id: number | string;
  name: string;
  image?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  image: string;
}

export type LaminateBrandConfig = {
  name: string;
  image: string;
  thicknesses: string[];
};

// --- 2. CONFIG DATA ---
export const LAMINATE_BRANDS_CONFIG: LaminateBrandConfig[] = [
  {
    name: "Merino",
    image: "/merino/Page10_Img2_Unmatched.jpeg",
    thicknesses: ["1.0mm", "0.7mm", "0.8mm"],
  },
  {
    name: "Greenlam",
    image: "/ShopByCategory/laminates.png",
    thicknesses: ["1.0mm", "0.8mm"],
  },
  {
    name: "CenturyPly",
    image: "/centuryply-logo.png",
    thicknesses: ["1.0mm", "0.8mm"],
  },
  {
    name: "Royale Touche",
    image: "/ShopByCategory/laminates.png",
    thicknesses: ["1.25mm", "1.0mm"],
  },
];

// --- 3. CATEGORIES & BRANDS ---
export const CATEGORIES: Category[] = [
  { id: 1, name: "Plywoods", image: "/ShopByCategory/plywood.jpg" },
  { id: 10, name: "Block Boards", image: "/ShopByCategory/block_boards.png" },
  { id: 11, name: "Flush Doors", image: "/ShopByCategory/flush_doors.png" },
  { id: 2, name: "Laminates", image: "/ShopByCategory/laminates.png" },
  { id: 4, name: "Digital Locks", image: "/ShopByCategory/highend_locks.png" },
  { id: 5, name: "Secured Safes", image: "/ShopByCategory/safes.jpg" },
  { id: 6, name: "Rafters", image: "/ShopByCategory/rafters.png" },
  { id: 7, name: "MDF/HDHMR", image: "/ShopByCategory/MDF.png" },
  { id: 8, name: "Adhesive", image: "/ShopByCategory/adhesives.jpg" },
  { id: 9, name: "Hardware", image: "/ShopByCategory/hardwares.jpg" },
];

export const BRANDS = [
  "Hafele",
  "Blum",
  "Greenply",
  "CenturyPly",
  "Godrej",
  "Europa",
  "Hettich",
];

export const FEATURED_BRANDS = [
  { name: "Hafele", image: "/ShopByCategory/hafele_logo.png" },
  { name: "Blum", image: "/ShopByCategory/blum_logo.png" },
  { name: "Greenply", image: "/greenply_logo.png" },
  { name: "CenturyPly", image: "/centuryply-logo.png" },
  { name: "Godrej", image: "/godrej_logo.jpg" },
  { name: "Europa", image: "/europalocks_logo.jpg" },
  { name: "Hettich", image: "/hettich_logo.png" },
];

export const BRAND_DESCRIPTIONS: Record<string, string> = {
  Hafele: "Explore the exclusive collection of Hafele products...",
  Blum: "Discover Blum's innovative lift systems...",
  Greenply: "Greenply is India's leading plywood brand...",
  CenturyPly: "Buy CenturyPly products online at best prices...",
  Godrej: "Secure your home with Godrej's advanced locking solutions...",
  Europa: "Europa locks are designed for maximum security...",
  Hettich: "Hettich is one of the world's largest manufacturers...",
};

// --- 4. TESTIMONIALS ---
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Suchita Sharma",
    rating: 5,
    text: "I bought most of the products from here, fair price, good behaviour, good service and delivery. Recommended",
    image: "/woman_icon.png",
  },
  {
    id: 2,
    name: "Fuadul Haque",
    rating: 4,
    text: "Very friendly place with latest state of art technology interior industry products.The owners & the staff are very professional & are very responsive. We wish all success in thier business",
    image: "/maile_icon.png",
  },
  {
    id: 3,
    name: "Madhu Sudhan",
    rating: 5,
    text: "Good staff, owner , collections and correct pricing.",
    image: "/maile_icon.png",
  },
  {
    id: 4,
    name: "HariKrishna J",
    rating: 4,
    text: "Good service",
    image: "/maile_icon.png",
  },
];

// --- 5. PRODUCTS (Empty now, using CMS) ---
export const FEATURED_PRODUCTS: Product[] = [];
