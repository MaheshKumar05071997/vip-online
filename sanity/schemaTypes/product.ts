import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    // --- NEW FIELD FOR ORDERING ---
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Low numbers appear first. Example: 1, 2, 3...",
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Main Product Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "variants",
      title: "Product Variants",
      description: "Add variants like 'Club Prime', 'Bond 710', etc.",
      type: "array",
      of: [
        {
          type: "object",
          title: "Variant",
          fields: [
            defineField({
              name: "name",
              title: "Variant Name",
              type: "string", // e.g., "Club Prime"
            }),
            defineField({
              name: "image",
              title: "Variant Image",
              type: "image",
            }),
            defineField({
              name: "price",
              title: "Default Price (Base Price)",
              type: "number",
            }),
            defineField({
              name: "originalPrice",
              title: "Default Original Price",
              type: "number",
            }),
            // 1. Add Thickness Options
            defineField({
              name: "thickness",
              title: "Available Thicknesses",
              description: "Add items like: 6mm, 12mm, 18mm, 19mm",
              type: "array",
              of: [{ type: "string" }],
            }),
            // 2. Add Size Options
            defineField({
              name: "sizes",
              title: "Available Sizes",
              description: "Add items like: 8x4, 7x4, 6x3",
              type: "array",
              of: [{ type: "string" }],
            }),
            // 3. Add Price Mapping Logic
            defineField({
              name: "priceMapping",
              title: "Price List (Advanced)",
              description:
                "Define specific prices for Thickness + Size combinations. If left empty, Default Price is used.",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "thickness",
                      title: "Thickness (must match above exactly)",
                      type: "string", // e.g. "19mm"
                    }),
                    defineField({
                      name: "size",
                      title: "Size (Optional)",
                      description:
                        "Leave empty if price applies to all sizes of this thickness",
                      type: "string", // e.g. "8x4"
                    }),
                    defineField({
                      name: "price",
                      title: "Price",
                      type: "number",
                    }),
                    defineField({
                      name: "originalPrice",
                      title: "Original Price",
                      type: "number",
                    }),
                  ],
                  preview: {
                    select: {
                      thick: "thickness",
                      size: "size",
                      price: "price",
                    },
                    prepare({ thick, size, price }) {
                      return {
                        title: `${thick || "Any"} ${
                          size ? "x " + size : ""
                        } = Rs. ${price}`,
                      };
                    },
                  },
                },
              ],
            }),
            defineField({
              name: "specs",
              title: "Variant Specifications",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "key", type: "string", title: "Label" },
                    { name: "value", type: "string", title: "Value" },
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
});
