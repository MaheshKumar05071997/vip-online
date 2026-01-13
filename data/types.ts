export interface Variant {
  name: string;
  image: string; // We will use the image URL string here
  price?: number; // Sanity schema has this as number
  originalPrice?: number;
  thickness?: string[];
  sizes?: string[];
  specs?: Record<string, string>;
  priceList?: Record<string, { price: string; originalPrice?: string }>;
}

export interface Product {
  id: string; // CHANGED from number to string
  name: string;
  category: string; // We will fetch the category *title*
  brand: string;
  image: string;
  variants?: Variant[];
  specs?: { key: string; value: string }[];
}

export interface Category {
  id: string;
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
