import { type SchemaTypeDefinition } from "sanity";
import product from "./product"; // Import the file you just made
import { categoryType } from "./categoryType"; // Import this

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, categoryType], // Add it to the array
};
