export interface Variant {
  name: string;
  image: string;
  price?: string;
  originalPrice?: string;
  thickness?: string[];
  sizes?: string[];
  specs?: Record<string, string>;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  image: string;
  variants?: Variant[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  image: string;
}
