// 1. Import from the new specialized files
import { PLYWOOD_PRODUCTS } from "@/data/plywoods";
import { LAMINATE_PRODUCTS } from "@/data/laminates";
import { KITCHEN_PRODUCTS } from "@/data/kitchen";
import { LOCK_PRODUCTS } from "@/data/locks";
import { SAFE_PRODUCTS } from "@/data/safes";
import { RAFTER_PRODUCTS } from "@/data/rafters";
import { MDF_PRODUCTS } from "@/data/mdf";
import { ADHESIVE_PRODUCTS } from "@/data/adhesive";
import { HARDWARE_PRODUCTS } from "@/data/hardware";
import { MERINO_PRODUCTS } from "@/data/merino";

// 2. Export Types & Base Data for the rest of the app to use
export {
  CATEGORIES,
  BRANDS,
  FEATURED_BRANDS,
  BRAND_DESCRIPTIONS,
} from "@/data/categories";
export { TESTIMONIALS } from "@/data/testimonials";
export type { Variant, Product } from "@/data/types";

// 3. Combine everything into one master list
export const FEATURED_PRODUCTS = [
  ...PLYWOOD_PRODUCTS,
  ...MERINO_PRODUCTS,
  ...LAMINATE_PRODUCTS,
  ...KITCHEN_PRODUCTS,
  ...LOCK_PRODUCTS,
  ...SAFE_PRODUCTS,
  ...RAFTER_PRODUCTS,
  ...MDF_PRODUCTS,
  ...ADHESIVE_PRODUCTS,
  ...HARDWARE_PRODUCTS,
];
