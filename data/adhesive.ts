import { Product } from "./types";

export const ADHESIVE_PRODUCTS: Product[] = [
  {
    id: 6,
    name: "Fevicol",
    category: "Adhesive",
    brand: "Pidilite",
    image: "/ShopByCategory/fevicol_logo.png",
    variants: [
      {
        name: "Fevicol SH",
        image: "/ShopByCategory/fevicol_sh.png",
        price: "105",
        originalPrice: "120",
        //thickness: ["30mm"],
        sizes: ["60KG", "50KG", "30KG", "20KG", "10KG", "5KG", "2KG", "1KG"],
      },
      {
        name: "Fevicol Marine",
        image: "/ShopByCategory/fevicol_marine.png",
        price: "105",
        originalPrice: "120",
        //thickness: ["30mm"],
        sizes: ["50KG", "30KG", "20KG", "10KG", "5KG", "2KG", "1KG"],
      },
      {
        name: "Fevicol Hyper",
        image: "/ShopByCategory/fevicol_hyper.png",
        price: "105",
        originalPrice: "120",
        //thickness: ["30mm"],
        sizes: ["50KG", "30KG", "20KG", "10KG", "5KG", "2KG", "1KG"],
      },
      {
        name: "Fevicol HeatX",
        image: "/ShopByCategory/fevicol_heatx.png",
        price: "105",
        originalPrice: "120",
        //thickness: ["30mm"],
        sizes: ["5 Litre", "2 Litre", "1 Litre", "1/2 Litre"],
      },
      {
        name: "Fevicol Pro Bond",
        image: "/ShopByCategory/fevicol_probond.png",
        price: "105",
        originalPrice: "120",
        //thickness: ["30mm"],
        sizes: ["10KG", "5KG", "1KG"],
      },
    ],
  },
  {
    id: 22,
    name: "Grippo",
    category: "Adhesive",
    brand: "Pidilite",
    image: "/ShopByCategory/grippo_logo.png",
    variants: [
      {
        name: "Grippo",
        image: "/Pine_Block_Board.jpg",
        price: "105",
        originalPrice: "120",
        //thickness: ["30mm"],
        sizes: ["50KG"],
      },
    ],
  },
  {
    id: 21,
    name: "Falcon Bond +",
    category: "Adhesive",
    brand: "Pidilite",
    image: "/ShopByCategory/falcon_bond_plus.png",
    variants: [
      {
        name: "Falcon Bond +",
        image: "/ShopByCategory/falcon_bond_plus.png",
        price: "105",
        originalPrice: "120",
        //thickness: ["30mm"],
        sizes: ["50KG"],
      },
    ],
  },
];
