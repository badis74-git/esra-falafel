# Esra Falafel — Module: Menus Management family
> Load with `design-system.md` (core). Covers Menus, Products, Categories, Sub-Categories, Add-on Groups pages.
> i18n namespaces for these live in `messages/*.json`; detailed specs to be expanded as each is revisited.

---

### Page — Menus Management
*(unchanged — see previous version)*

### Page — Products Management
*(unchanged — see previous version)*

### Page — Categories Management
*(unchanged — see previous version)*

### Page — Sub-Categories Management
*(unchanged — see previous version)*

### Page — Add-on Groups Management
*(unchanged — see previous version)*

---


## Edit Menu — v2 (REDESIGNED: wizard → section-nav modal)

> **What changed:** the old Edit Menu was a multi-step **wizard**. v2 replaces it with a **section-nav modal** — the SAME pattern as `EditDriverModal` (§9 Section-nav modal pattern + core §5b R4). **Create Menu stays a wizard** (unchanged); only Edit Menu is redesigned. Build `EditMenuModal` by mirroring `EditDriverModal` — reuse its shell, header, rail, footer, and responsive (desktop two-pane / mobile drill-in) behavior. Do not rebuild the shell from scratch.

### `EditMenuModal` ← Menus ← NEW (left-rail section modal)
**File:** `src/components/menus/EditMenuModal.tsx`
```tsx
{ isOpen, menu: Menu, onClose, onSaved, onToggleStatus }
// Shell = identical to EditDriverModal (core §5b R1 + R4):
//   Mobile: full-screen sheet + drill-in (section list -> tap -> section + back).
//   Desktop: centered card, two-pane (left rail + right content).
// HEADER: menu name "Vegan Menu" (Modal Title named) + StatusToggle inline + close.
// LEFT RAIL — "General" group label, 3 nav items (icon tile + label):
//   Menu Information   (default active)
//   Categories
//   Products
// Active item: white pill, neutral-900 bold, green icon tile. Inactive: green icon tile, neutral-700.
// RIGHT PANE renders the active sections/*.tsx. Each section has its OWN footer:
//   [Cancel] (secondary) + [Save Changes] (primary) — full-width flex on mobile (core §5b R5).
// Save -> ChangesSavedModal (REUSE drivers ChangesSavedModal or a shared one).
// const [activeSection, setActiveSection] = useState<MenuEditSection>('info')   // 'info'|'categories'|'products'
// const [mobileView, setMobileView] = useState<'list'|'section'>('list')        // §5b R4
```

#### `sections/MenuInfoSection` ← NEW
```tsx
// Title "Menu Information" (green Section Title).
// Top row: menu picture (thumbnail) + "Menu picture / PNG, JPEG under 15MB" + [Delete] (text-danger).
// Grid 2-col (collapse to 1-col on mobile, §5b R5):
//   Menu Name * (Input, doc icon)  |  Assigned Branches * (MultiSelectDropdown, "Esra Falafel 1, Esra Falafel 2")
// Menu Description (textarea, full width, placeholder "Enter description").
// Menu PDF Format: FileAttachmentRow (REUSE) — PDF badge + "File Name.pdf" + "16 Mai 2026 · 12:30 · 5MB" + view/download/delete.
// Footer: Cancel + Save Changes.
```

#### `sections/MenuCategoriesSection` ← NEW
```tsx
{ categories: MenuCategory[] }
// Title "Categories" (green).
// Toolbar: ViewToggle (Grid/List) + SearchInput + Filters button (REUSE all). Wraps on mobile.
// Select-All row (REUSE Select-All pattern): checkbox + "Select All".
// GRID VIEW -> SelectableCategoryRow (card variant), one full-width row per category:
//   checkbox + category image + name + right side "N Products" and "N Sub-categories" (two stacked metrics) + chevron (expand).
// LIST VIEW -> table: checkbox | Category Name (image + name) | Sub-categories (comma list, "-" if none) | Products (count).
// Footer: Cancel + Save Changes.
// Selection state = string[] of category ids (Select-All pattern).
```

#### `sections/MenuProductsSection` ← NEW
```tsx
{ products: MenuProduct[] }
// Title "Products" (green).
// Toolbar: ViewToggle (Grid/List) + SearchInput + Filters (REUSE).
// FilterTabs (REUSE): View all · Sandwich · Plates · Combos · Starters · Drinks.
// Select-All row.
// GRID VIEW -> SelectableProductRow (card variant), one full-width row per product:
//   checkbox + product image + DietaryBadge (Vegan/Meat) + category (small, neutral-500) over product name (bold)
//   + right side: price (green, e.g. "6.00 EUR") over prep time (e.g. "10 - 15 min", neutral-500).
// LIST VIEW -> table: checkbox | Product Name (image + name) | Category | Dietary T | Price | Discount.
//   Discount column = DISPLAY-ONLY filler (always "0%"); NOT an editable field, NOT in the data shape.
// Pagination row (REUSE): Previous · 1 2 3 ... 8 9 10 · Next.
// Footer: Cancel + Save Changes.
// Selection state = string[] of product ids.
```

---

### Shared UI — NEW components for Edit Menu (build as shared, reusable by Products/Categories modules)

#### `SelectableCategoryRow` ← Shared UI ← NEW
**File:** `src/components/ui/SelectableCategoryRow.tsx`
```tsx
{ category: { id, name, image, productCount, subCategoryCount, subCategories?: string[] },
  selected: boolean, onToggle, variant: 'grid' | 'list', expanded?, onExpand? }
// grid: full-width card row — checkbox + image + name + ("N Products" / "N Sub-categories") + chevron.
// list: table-row cells — checkbox · image+name · sub-categories (joined, "-" if none) · product count.
// Checkbox uses existing Checkbox component; selected styling matches Select-All pattern.
```

#### `SelectableProductRow` ← Shared UI ← NEW
**File:** `src/components/ui/SelectableProductRow.tsx`
```tsx
{ product: { id, name, image, category, dietary: 'vegan'|'meat', price, prepTime },
  selected: boolean, onToggle, variant: 'grid' | 'list' }
// grid: full-width card row — checkbox + image + DietaryBadge + category-over-name + price-over-prepTime (right).
// list: table-row cells — checkbox · image+name · category · dietary · price · discount("0%" filler).
// DietaryBadge + Checkbox REUSED. Price green via existing price formatting pattern (`${n.toFixed(2)} EUR`).
```

---

### Edit Menu data shapes (`src/lib/mock/menus.ts`)
```ts
interface Menu {
  id: string; name: string; picture?: string
  branches: string[]                 // ["Esra Falafel 1","Esra Falafel 2"]
  description?: string
  pdf?: { name: string; date: string; size: string; url: string }
  status: 'active' | 'inactive' | 'archived'
  categoryIds: string[]              // selected categories
  productIds: string[]               // selected products
}
interface MenuCategory {
  id: string; name: string; image: string
  productCount: number; subCategoryCount: number; subCategories: string[]
}
interface MenuProduct {
  id: string; name: string; image: string; category: string
  dietary: 'vegan' | 'meat'; price: number; prepTime: string   // "10 - 15 min"
}
// NOTE: "discount" is NOT a field — the List-view Discount column is display-only "0%".
// NOTE: "Menu's / Menu's Deals" category is a static placeholder, no special modeling.
```

### i18n — menus namespace additions (Edit Menu)
> Add these keys to the existing `menus` namespace in `messages/en.json` + `messages/de.json` (mirrored). Reuse existing shared keys (view toggle, filters, search, selectAll, pagination, cancel, save) from `common`/`menus` if already present.
```
menus.edit.nav: { info, categories, products }            // "Menu Information" / "Categories" / "Products"
menus.info: { title, picture, pictureHint, delete, name, namePlaceholder,
              branches, branchesPlaceholder, description, descriptionPlaceholder, pdfLabel }
menus.categories: { title, selectAll, colName, colSubcategories, colProducts,
                    products, subCategories, noneDash }     // "products"/"subCategories" = "{count} Products" etc.
menus.products: { title, selectAll, colName, colCategory, colDietary, colPrice, colDiscount,
                  tabs: { all, sandwich, plates, combos, starters, drinks } }
menus.edit.cancel / menus.edit.save                         // or reuse common
```
German mirrors: "Menüinformationen" / "Kategorien" / "Produkte", "Zugewiesene Filialen", "Menübeschreibung", "Alle auswählen", "Unterkategorien", "Produkte", "Rabatt". Watch length on "Zugewiesene Filialen" and tab labels (German layout risk).

---