export const CATEGORIES = [
  { id: 1, name: "Plywoods", image: "/placeholder-ply.jpg" },
  { id: 2, name: "Laminates", image: "/placeholder-lam.jpg" },
  { id: 3, name: "Kitchen Fittings", image: "/placeholder-kitchen.jpg" },
  { id: 4, name: "High-End Locks", image: "/placeholder-lock.jpg" },
  { id: 5, name: "Safes & Security", image: "/placeholder-safe.jpg" },
  { id: 6, name: "Rafters", image: "/placeholder-rafter.jpg" },
  { id: 7, name: "MDF/HDHMR", image: "/placeholder-mdf.jpg" },
  { id: 8, name: "Adhesive", image: "/placeholder-glue.jpg" },
  { id: 9, name: "Hardware", image: "/placeholder-hardware.jpg" },
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

// NEW: Descriptions for the Brand Collection Pages
export const BRAND_DESCRIPTIONS: Record<string, string> = {
  Hafele:
    "Explore the exclusive collection of Hafele products at VIP Online. Known for German engineering and precision, Hafele offers premium architectural hardware, kitchen fittings, and furniture fittings. Whether you are designing a modern kitchen or upgrading your wardrobe, Hafele ensures durability and style.",
  Blum: "Discover Blum's innovative lift systems, hinge systems, and pull-out systems. Blum is synonymous with high-quality motion technologies that bring convenience to furniture. Buy authentic Blum fittings at wholesale prices.",
  Greenply:
    "Greenply is India's leading plywood brand, offering superior quality plywood, blockboards, and flush doors. Perfect for both residential and commercial projects, Greenply ensures longevity and termite resistance.",
  CenturyPly:
    "Buy CenturyPly products online at best prices. Synonymous with strength and durability, CenturyPly offers a wide range of plywood, laminates, and veneers. Protect your furniture with their award-winning ViroKill technology.",
  Godrej:
    "Secure your home with Godrej's advanced locking solutions and safes. From biometric safes to high-security rim locks, Godrej provides peace of mind with trusted security technology.",
  Europa:
    "Europa locks are designed for maximum security and ease of use. Browse our range of Europa main door locks, padlocks, and antique finish handles that combine aesthetics with safety.",
  Hettich:
    "Hettich is one of the world's largest manufacturers of furniture fittings. Explore our range of Hettich hinges, drawer systems, and sliding door channels for seamless furniture functionality.",
};

export const FEATURED_PRODUCTS = [
  // Kitchen
  {
    id: 1,
    name: "Hafele Kitchen Tandem Box",
    category: "Kitchen Fittings",
    brand: "Hafele",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=500",
  },
  // Safes
  {
    id: 2,
    name: "Digital Biometric Safe",
    category: "Safes & Security",
    brand: "Godrej",
    image:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=500",
  },
  // Plywood
  {
    id: 3,
    name: "Premium Teak Plywood",
    category: "Plywoods",
    brand: "Greenply",
    image:
      "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80&w=500",
  },
  // Hardware
  {
    id: 4,
    name: "Blum Soft Close Hinge",
    category: "Hardware",
    brand: "Blum",
    image:
      "https://images.unsplash.com/photo-1532323544230-7191fd510c59?auto=format&fit=crop&q=80&w=500",
  },
  // MDF
  {
    id: 5,
    name: "Action Tesa HDHMR Board",
    category: "MDF/HDHMR",
    brand: "Action Tesa",
    image:
      "https://plus.unsplash.com/premium_photo-1673549646467-31e98835ae04?auto=format&fit=crop&q=80&w=500",
  },
  // Adhesive
  {
    id: 6,
    name: "Fevicol HeatX",
    category: "Adhesive",
    brand: "Pidilite",
    image:
      "https://images.unsplash.com/photo-1597423244036-ef5020e83f3c?auto=format&fit=crop&q=80&w=500",
  },
  // Laminates
  {
    id: 7,
    name: "Royal Touch 1mm Laminate",
    category: "Laminates",
    brand: "Greenlam",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=500",
  },
  // Rafters
  {
    id: 8,
    name: "Decorative Wall Rafters",
    category: "Rafters",
    brand: "VIP",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7fab530?auto=format&fit=crop&q=80&w=500",
  },
  // High End Locks
  {
    id: 9,
    name: "Europa Mortise Smart Lock",
    category: "High-End Locks",
    brand: "Europa",
    image:
      "https://images.unsplash.com/photo-1558002038-1091a166111c?auto=format&fit=crop&q=80&w=500",
  },
];

// ... existing imports and arrays ...

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Christopher & Victor",
    rating: 5,
    text: "We have been in this field for 12 years, and VIP Online provides very good materials at competitive prices, especially their Standard Plus range. Their prices for Greenply and fabrics are much cheaper compared to others. They always deliver on time.",
    image: "https://randomuser.me/api/portraits/men/32.jpg", // Placeholder user image
  },
  {
    id: 2,
    name: "Gowtham",
    rating: 5,
    text: "Their streamlined business operations from maintaining records to handling customer service are highly impressive. As a startup, we were particularly pleased with their competitive pricing. VIP helped us secure the best products at great rates.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Siva",
    rating: 5,
    text: "It's been a great experience working with VIP. Anshul and Pankaj are amazing. All the orders are getting delivered on time. Initially they started with Plywood and Laminates. As per the Client's demand, they have started integrating Hardwares as well.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 4,
    name: "Rajesh Reddy",
    rating: 5,
    text: "We use 90% scope of Plywood, Laminates & other Interior materials from VIP Online. We are getting top grade quality in very competitive pricing than anyone else in Bangalore. Their plywood has been an absolute pleasure to work with.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
];
