export type LaminateBrandConfig = {
  name: string;
  image: string;
  thicknesses: string[];
};

export const LAMINATE_BRANDS_CONFIG: LaminateBrandConfig[] = [
  {
    name: "Merino",
    // You can change this image to a logo or a representative product image
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