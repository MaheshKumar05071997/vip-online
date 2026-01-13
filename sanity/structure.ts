import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Catalog")
    .items([
      // 1. Show All Products
      S.documentTypeListItem("product").title("All Products"),

      // --- NEW: Filter Products by Category ---
      S.listItem()
        .title("Products by Category")
        .child(
          S.documentTypeList("category")
            .title("Select a Category")
            .child((categoryId) =>
              S.documentList()
                .title("Products")
                .filter('_type == "product" && category._ref == $categoryId')
                .params({ categoryId })
            )
        ),

      // 2. Show Categories
      S.documentTypeListItem("category").title("Categories"),

      S.divider(),

      // 3. Show any other items
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() && !["product", "category"].includes(item.getId()!)
      ),
    ]);
