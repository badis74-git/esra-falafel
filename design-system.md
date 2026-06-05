# Esra Falafel — Design System
> Stack: Next.js 16 + Tailwind CSS v4 (tokens via `@theme inline` in globals.css) · i18n: next-intl (en/de, cookie-based)
> Last updated: 2026-06-05 | Modules: Auth ✅ · Restaurant Managers ✅ · Delivery Drivers ✅ · Zone Management ✅ · Restaurants ✅ · Menus Management ✅ · Products ✅ · Categories ✅ · Sub-Categories ✅ · Add-on Groups ✅
> **All modules are bilingual (English + German).** See §8 Internationalization before building or editing any module.

---

## Module Coverage

| Module | Status | Route |
|---|---|---|
| Auth (Login, Forgot PW, OTP, Reset PW) | ✅ Done | `/login`, `/forgot-password`, `/verify-otp`, `/reset-password` |
| Restaurant Managers | ✅ Done | `/managers` |
| Delivery Drivers | ✅ Done | `/drivers` |
| Zone Management | ✅ Done | `/zones` |
| Restaurants Management | ✅ Done | `/restaurants` |
| Menus Management | ✅ Done | `/menus` |
| Products Management | ✅ Done | `/products` |
| Categories Management | ✅ Done | `/categories` |
| Sub-Categories Management | ✅ Done | `/sub-categories` |
| Add-on Groups Management | ✅ Done | `/add-on-groups` |
| Add-ons | ⬜ Not built — static nav link only | — |

---

## 1. Colors

| Token | Hex | Tailwind Key | Usage |
|---|---|---|---|
| Primary | `#2D6A3F` | `primary` | Buttons, checkbox fill, active states, sidebar bg |
| Primary Dark | `#1E4D2B` | `primary-dark` | Button hover, left auth panel gradient end |
| Primary Light | `#EAF2EC` | `primary-light` | Subtle green tints, success check bg, dropdown selected-row tint |
| Accent Orange | `#C97B2E` | `accent-orange` | "Forgot Password?", "Contact Administrator" links |
| Neutral 900 | `#1A1A1A` | `neutral-900` | Headings |
| Neutral 700 | `#3D3D3D` | `neutral-700` | Body text |
| Neutral 500 | `#6B7280` | `neutral-500` | Placeholders, subtitles, helper text |
| Neutral 300 | `#D1D5DB` | `neutral-300` | Input borders default, dividers |
| Neutral 100 | `#F9FAFB` | `neutral-100` | Page background, table header |
| White | `#FFFFFF` | `white` | Cards, panels, modals |
| Error | `#EF4444` | `error` | Error text, expired OTP |
| Error Border | `#FCA5A5` | `error-border` | Input border in error state |
| Error BG | `#FEF2F2` | `error-bg` | Input background tint in error state |
| Stat Orange | `#F97316` | `stat-orange` | Total stat icon bg |
| Stat Orange BG | `#FFF7ED` | `stat-orange-bg` | Total stat card tint |
| Stat Green | `#16A34A` | `stat-green` | Active stat icon bg, trend up |
| Stat Green BG | `#F0FDF4` | `stat-green-bg` | Active stat card tint |
| Stat Yellow | `#EAB308` | `stat-yellow` | Inactive stat icon bg |
| Stat Yellow BG | `#FEFCE8` | `stat-yellow-bg` | Inactive stat card tint |
| Stat Red | `#DC2626` | `stat-red` | Archived stat icon bg, trend down, delete |
| Stat Red BG | `#FEF2F2` | `stat-red-bg` | Archived stat card tint |
| Sidebar BG | `#2D6A3F` | `sidebar-bg` | Sidebar background (= primary) |
| Sidebar Active | `rgba(255,255,255,0.15)` | `sidebar-active` | Active nav item bg |
| Sidebar Hover | `rgba(255,255,255,0.08)` | `sidebar-hover` | Nav item hover |
| Sidebar Text | `rgba(255,255,255,0.75)` | `sidebar-text` | Inactive nav label |
| Page BG | `#F0FDF4` | `page-bg` | Dashboard page background |
| Table Header | `#F9FAFB` | `table-header` | Table header row bg |
| Table Border | `#E5E7EB` | `table-border` | Table dividers, modal header border |
| Table Row Hover | `#F9FAFB` | `table-row-hover` | Table row hover state |
| Table Archived | `#9CA3AF` | `table-archived` | Archived row muted text |
| Trend Up | `#16A34A` | `trend-up` | Positive trend text + arrow |
| Trend Down | `#DC2626` | `trend-down` | Negative trend text + arrow |
| Danger | `#DC2626` | `danger` | Delete buttons, delete modal CTA |
| Danger Light | `#FEF2F2` | `danger-light` | Delete button hover bg |
| Vegan Badge BG | `#DCFCE7` | `vegan-badge-bg` | Vegan dietary badge background |
| Vegan Badge Text | `#16A34A` | `vegan-badge-text` | Vegan dietary badge text + icon |
| Meat Badge BG | `#F3F4F6` | `meat-badge-bg` | Meat dietary badge background |
| Meat Badge Text | `#6B7280` | `meat-badge-text` | Meat dietary badge text + icon |

---

## 2. Typography

| Style | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| H1 | 28px | 700 | 36px | Auth page titles |
| H2 | 22px | 700 | 30px | Modal titles (success, fail, delete) |
| H3 | 18px | 700 | 26px | Dashboard page title (Topbar) |
| Body | 14px | 400 | 22px | General text, table cells |
| Label | 14px | 500 | 20px | Input labels, form section labels |
| Small | 12px | 400 | 18px | Helper text, email below name in table |
| Button | 14px | 600 | 20px | All button labels |
| Section Title | 14px | 600 | 20px | Modal section headers — `text-primary` green |
| Stat Count | 24px | 700 | 32px | Stat card numbers |
| Stat Label | 12px | 400 | 18px | Stat card labels |
| Trend | 12px | 500 | 16px | Trend % text |
| Breadcrumb | 12px | 400 | 16px | "Admin" breadcrumb in topbar |
| Step Label | 11px | 400 | 16px | Stepper step labels below circle |
| Badge | 11px | 500 | 16px | Dietary badge text |
| Branch Pill | 11px | 500 | 16px | Branch pill label on menu grid card |

Font Family: **Inter** (Google Fonts), `sans-serif` fallback.

---

## 3. Spacing Scale

| Usage | Value | Tailwind |
|---|---|---|
| Page horizontal padding mobile | 24px | `px-6` |
| Page horizontal padding desktop | 40px | `px-10` |
| Page inner padding | 24px | `p-6` |
| Form gap between fields | 16px | `gap-4` |
| Section gap | 24px | `gap-6` |
| Input internal padding | 12px 16px | `py-3 px-3.5` |
| Button padding large | 12px 16px | `py-3 px-4` |
| Auth modal padding | 32px | `p-8` |
| Stat card padding | 16px | `p-4` |
| Table cell padding | 12px 16px | `py-3 px-4` |
| Sidebar collapsed width | 72px | `w-[72px]` |
| Sidebar expanded width | 220px | `w-[220px]` |
| Topbar height | 64px | `h-16` |
| Form card padding | 24px | `p-6` |

---

## 4. Border Radius

| Element | Value | Tailwind |
|---|---|---|
| Input | 8px | `rounded-lg` |
| Button | 8px | `rounded-lg` |
| OTP box | 8px | `rounded-lg` |
| Auth success modal | 20px | `rounded-[20px]` |
| Dashboard modal | 16px | `rounded-[16px]` |
| Logo / Avatar | 50% | `rounded-full` |
| Sidebar nav pill | 8px | `rounded-lg` |
| Filter tab pill | 9999px | `rounded-full` |
| Toggle track | 9999px | `rounded-full` |
| Stat card | 12px | `rounded-[12px]` |
| Grid card (all modules) | 12px | `rounded-[12px]` |
| Content card | 12px | `rounded-[12px]` |
| Auth left panel right edge | 80px CSS | `border-radius: 0 80px 80px 0` |
| Map embed / editor | 8px | `rounded-lg` |
| Stepper header | 12px | `rounded-[12px]` |
| Inline picker dropdown | 8px | `rounded-lg` |
| Tooltip | 6px | `rounded-md` |
| Dietary badge | 9999px | `rounded-full` |
| Branch pill | 9999px | `rounded-full` |
| PDF upload zone | 8px | `rounded-lg` |

---

## 5. Shadows

| Element | Value | Tailwind / custom |
|---|---|---|
| Input | `0 1px 2px rgba(0,0,0,0.05)` | `shadow-input` |
| Auth modal | `0 20px 60px rgba(0,0,0,0.15)` | `shadow-modal` |
| Stat / grid card | `0 1px 3px rgba(0,0,0,0.08)` | `shadow-card` |
| Dashboard modal | `0 20px 40px rgba(0,0,0,0.12)` | `shadow-dashboard-modal` |
| Topbar | bottom border only | `border-b border-table-border` |
| Inline dropdown | `0 4px 16px rgba(0,0,0,0.12)` | `shadow-lg` |

---

## 6. Components

### Component File Map

```
src/components/
├── ui/
│   ├── Input.tsx
│   ├── Button.tsx
│   ├── Checkbox.tsx
│   ├── LanguageSelector.tsx
│   ├── BrandHeader.tsx
│   ├── StatBadge.tsx
│   ├── Avatar.tsx
│   ├── PhoneInput.tsx
│   ├── SelectDropdown.tsx            ← REUSED (Selection Type dropdown)
│   ├── SearchInput.tsx
│   ├── StatusToggle.tsx              ← REUSED (now also a form control)
│   ├── StatCard.tsx
│   ├── FilterTabs.tsx
│   ├── ViewToggle.tsx
│   ├── EmptyState.tsx
│   ├── MapPreview.tsx
│   ├── ProfilePictureUpload.tsx
│   ├── MultiSelectDropdown.tsx
│   ├── ZoneMapEditor.tsx
│   ├── StepperHeader.tsx
│   ├── TimeInput.tsx
│   ├── PdfUploadZone.tsx
│   └── DietaryBadge.tsx
├── auth/
│   ├── AuthLayout.tsx
│   ├── OtpInput.tsx
│   └── SuccessModal.tsx
├── layout/
│   ├── Sidebar.tsx                   ← UPDATE (activate Add-on Groups sub-item)
│   ├── Topbar.tsx
│   └── DashboardLayout.tsx
├── managers/ [...]
├── drivers/ [...]
├── zones/ [...]
├── restaurants/ [...]
├── menus/ [...]
├── products/ [...]
├── categories/ [...]
├── sub-categories/ [...]
└── add-on-groups/                    ← NEW
    ├── AddOnGroupGridCard.tsx
    ├── AddOnGroupListRow.tsx
    ├── AddAddOnGroupModal.tsx
    ├── EditAddOnGroupModal.tsx
    ├── DeleteAddOnGroupModal.tsx
    ├── SuccessModal.tsx
    └── FailModal.tsx
```

---

### `SelectDropdown` ← Shared UI ← REUSED (state spec confirmed)
**File:** `src/components/ui/SelectDropdown.tsx`
Used by Add-on Groups for **Selection Type** (`Single Choice` / `Multiple Choice`). Confirmed dropdown states:
- Closed: input-style trigger, placeholder neutral-500, ChevronDown right.
- Open: white panel `rounded-lg shadow-lg`, options listed.
- Hover/selected option: `primary-light` row tint + green check (✓ `text-primary`) right-aligned.
- Filled trigger: selected label in neutral-900.
No new component — this is the existing `SelectDropdown` behavior.

---

### `StatusToggle` ← Shared UI ← REUSED (new form usage)
**File:** `src/components/ui/StatusToggle.tsx`
Previously used in tables and grid cards. Add-on Groups introduces a **form-control usage**: the modal's "Required Add-ons" toggle (left label + toggle, off by default). Same component, same visual; just placed inline in a form row.

---

### `StepperHeader` ← Shared UI
**File:** `src/components/ui/StepperHeader.tsx`
```tsx
{ steps: { number: number; label: string }[], currentStep: number }
// Green bg panel rounded-[12px]
```

---

### `EmptyState` ← Shared UI
**File:** `src/components/ui/EmptyState.tsx`
```tsx
{ title, subtitle, illustration?: 'person' | 'location' | 'box' | 'clipboard' }
// Add-on Groups uses illustration="box"
```

---

### `Sidebar` ← Dashboard Layout ← UPDATE
**File:** `src/components/layout/Sidebar.tsx`
Menu Management group now has one more **active** sub-item:
```
Menu Management  ∧
  ├─ Menus
  ├─ Products
  ├─ Categories
  ├─ Sub-Categories
  ├─ Add-on Groups        ← NOW ACTIVE → /add-on-groups
  └─ Add-ons              ← STATIC (no route, no page — do not build)
```
- Activate the `Add-on Groups` sub-item and route it to `/add-on-groups`.
- `Add-ons` stays a static, non-functional nav label (same handling as before for unbuilt items).
- Expanded state persists while any `/add-on-groups` sub-route is active.

---

### `AddOnGroupGridCard` ← Add-on Groups ← NEW
**File:** `src/components/add-on-groups/AddOnGroupGridCard.tsx`
```tsx
{ group: AddOnGroup }
// White card rounded-[12px] shadow-card. NO image.
// Header row: group name (bold 16px) + StatusToggle (top-right)
// Key-value rows (label neutral-700 left, value bold right):
//   Selection Type (Single/Multiple) · Products (count) · Minimum Selection · Maximum Selection
// Footer border-t: Delete (secondary, trash) + "Edit Add-on Group" (primary, edit icon)
// NOTE: mockup shows a stray "Edit sub-category" label on one card — that is a copy-paste
//   error. Correct label is "Edit Add-on Group" on EVERY card.
// Archived: opacity-60, disabled actions.
```

---

### `AddOnGroupListRow` ← Add-on Groups ← NEW
**File:** `src/components/add-on-groups/AddOnGroupListRow.tsx`
```tsx
{ group: AddOnGroup, view: 'list' }
// Columns: Checkbox | Add-on Group Name | Selection Type | Minimum Selection |
//   Maximum Selection | Required/Optional | Add-ons (count) | Products (count) |
//   Status (StatusToggle) | Actions (edit + duplicate + delete + kebab)
// Required/Optional cell: "Required" if group.required else "Optional"
// Selection Type cell: "Single" / "Multiple"
```

---

### `AddAddOnGroupModal` ← Add-on Groups ← NEW
**File:** `src/components/add-on-groups/AddAddOnGroupModal.tsx`
```tsx
{ isOpen, onClose, onCreated }
// Modal shell, single-step form (no wizard). NO image upload.
// Header: "Add New Add-on Group" + StatusToggle (next to title)
// Fields:
//   Add-on Group Name* (Input, "Enter add-on group name")
//   Selection Type* (SelectDropdown: Single Choice / Multiple Choice, "Select selection type")
//   Minimum Selection / Maximum Selection (two number Inputs, grid-cols-2 gap-4, placeholder 0)
//   Description (textarea, optional, "Enter description")
//   Required Add-ons (StatusToggle, label left, off by default)
// Footer: Cancel (secondary) + "+ Create Add-on Group" (primary)
//   CTA disabled until Name + Selection Type filled (opacity-50 cursor-not-allowed)
// On submit → onCreated() → SuccessModal (variant 'created')
```

---

### `EditAddOnGroupModal` ← Add-on Groups ← NEW
**File:** `src/components/add-on-groups/EditAddOnGroupModal.tsx`
```tsx
{ isOpen, group, onClose, onSaved }
// Same form, pre-filled from group prop.
// Header: group name + StatusToggle
// Final CTA: "Save Changes"
// On submit → onSaved() → SuccessModal (variant 'updated')
```

---

### `DeleteAddOnGroupModal` ← Add-on Groups ← NEW
**File:** `src/components/add-on-groups/DeleteAddOnGroupModal.tsx`
```tsx
{ isOpen, group, onClose, onConfirm }
// Red trash illustration
// Title: "Are You Sure You Want To Delete Add-On Group '{group.name}' ?"
// Subtitle: "The add-on group will be permanently removed from all assigned products."
// CTAs: "Delete Add-on Group" (bg-danger) + "Cancel" (secondary)
```

---

### `SuccessModal` (add-on-groups) ← Add-on Groups ← NEW
**File:** `src/components/add-on-groups/SuccessModal.tsx`
```tsx
{ variant: 'created' | 'updated', onGoToList, onCreateAnother? }
// variant 'created':
//   Title: "Add-on Group Created Successfully"
//   Subtitle: "The add-on group has been added to the add-on group list and is now available for management."
//   CTAs: "Return To Add-on Group List" (primary) + "+ Create New Add-on Group" (secondary)
// variant 'updated':
//   Title: "Changes Saved Successfully"
//   CTA: "Return To Add-on Group List" (primary, single)
```

---

### `FailModal` ← Add-on Groups ← NEW
**File:** `src/components/add-on-groups/FailModal.tsx`
Identical to other modules. "Oops! Something went wrong." + "We couldn't save the changes! Please try again." + "Try Again" + "Back".

---

## 7. Pages

### Page — Add-on Groups Management ← NEW
**File:** `src/app/(dashboard)/add-on-groups/page.tsx`

**Stat cards:** Total Add-on groups `stat-orange` · Active `stat-green` · Inactive `stat-yellow` · Archived `stat-red`. Icon: `UtensilsCrossed`.

**Toolbar:** Left: `FilterTabs` (all/active/inactive/archived). Right: `ViewToggle` + `SearchInput` + Filters + Export + Import + "+ Add New Add-on group" primary.

**Grid view:** 3-col `AddOnGroupGridCard` — no image · header (name + StatusToggle) · key-value rows (Selection Type / Products / Min Selection / Max Selection) · footer Delete + Edit Add-on Group.

**List view columns:** checkbox · Add-on Group Name · Selection Type · Minimum Selection · Maximum Selection · Required/Optional · Add-ons · Products · Status (`StatusToggle`) · Actions (edit + duplicate + delete + kebab).

**Empty state:** `illustration="box"`, title "No add-on groups created yet", subtitle "Create groups of add-ons (e.g., Sauces, Extras) that can be reused across multiple products."

**Page state:**
```tsx
type ModalState =
  | { type: 'create' }
  | { type: 'edit'; group: AddOnGroup }
  | { type: 'delete'; group: AddOnGroup }
  | { type: 'success'; variant: 'created' | 'updated' }
  | { type: 'fail' }
  | null
```

**Mock data shape** (`src/lib/mock/addOnGroups.ts`):
```ts
interface AddOnGroup {
  id: string; name: string
  selectionType: 'single' | 'multiple'
  minSelection: number; maxSelection: number
  required: boolean              // drives Required/Optional column
  addOns: number; products: number
  description: string
  status: 'active' | 'inactive' | 'archived'
}
```
7 rows seeded (all active → Total 7 / Active 7 / Inactive 0 / Archived 0):
Sauces (multiple, 0/3, optional, 5/22) · Extra Toppings (multiple, 0/2, required, 2/15) · Bread Choice (single, 1/1, required, 2/20) · Cheese Options (single, 0/1, optional, 4/3) · Spicy Level (single, 1/1, required, 3/50) · Side Choices (single, 0/1, optional, 3/4) · Drink Upgrade (single, 0/1, optional, 2/4).

> **Note on source mockups:** the originals contain typos ("Optionala") in the Drink Upgrade row and grid/list product-count mismatches (e.g. Sauces 22 vs 12, Spicy Level 50 vs 22). The seed above is the normalized, internally-consistent set — list and grid must show the same numbers.

**Add/Edit modal fields (no picture upload):** Add-on Group Name* · Selection Type* (`SelectDropdown`: Single Choice / Multiple Choice) · Minimum Selection / Maximum Selection (number inputs) · Description (textarea, optional) · Required Add-ons (`StatusToggle`). CTA disabled until Name + Selection Type filled.

---

### Page — Menus Management
**File:** `src/app/(dashboard)/menus/page.tsx`

**Stat cards:**
- Total Menus → `stat-orange` / `stat-orange-bg` — FileText/menu icon
- Active Menus → `stat-green` / `stat-green-bg` — FileText icon
- Inactive Menus → `stat-yellow` / `stat-yellow-bg` — FileText icon
- Archived Menus → `stat-red` / `stat-red-bg` — FileText icon

**Toolbar:**
Left: `FilterTabs` (all / active / inactive / archived)
Right: `ViewToggle` + `SearchInput` + Filters + Export + Import + "+ Add New Menu" primary button

**Grid view:** 3-column grid of `MenuGridCard`

**List view columns:**
Product Name (image + name) | Products | Categories | Branches | Last Updated | Creation Date | Status (StatusToggle) | Actions (edit + **duplicate** + delete + kebab)

**Empty state:**
`EmptyState` with `illustration="clipboard"`, title "No menus created yet", subtitle "Create your first menu to organize products for a specific restaurant branch."

**Page state:**
```tsx
type ModalState =
  | { type: 'create' }
  | { type: 'update'; menu: Menu }
  | { type: 'delete'; menu: Menu }
  | { type: 'success'; variant: 'created' | 'updated' }
  | { type: 'fail' }
  | null
```

> The full Menus wizard/component specs (StepperHeader, MenuWizardModal, CategorySelectionRow, ProductSelectionRow, BranchPills, etc.) and the Menus mock data live with the original Menus build — see the Menus component entries above and the project source. Retained here only at page-summary level to keep §7 consistent across modules.

---

### Page — Products Management
**File:** `src/app/(dashboard)/products/page.tsx`

**Stat cards:** Total Products `stat-orange` · Active `stat-green` · Inactive `stat-yellow` · Archived `stat-red`. Icon: `UtensilsCrossed`.

**Toolbar:**
Left: category filter pills (View all · Sandwich · Plates · Combos · Starters · Drinks) — inline `<button>` pills, not `FilterTabs`.
Right: `ViewToggle` + `SearchInput` + Filters + Export + Import + "+ Add New Product" primary.

**Grid view:** 3-col `ProductGridCard` — image (h-48) + `DietaryBadge` top-left + `StatusToggle` top-right · category label + name + price + prepTime · footer Delete + Edit Product.

**List view columns:** checkbox · Product Name (image 32px + name) · Category · Dietary Type (`DietaryBadge`) · Price · Add-ons Groups · Assigned Menus · Status (`StatusToggle`) · Actions (edit + duplicate + delete + kebab).

**Empty state:** `illustration="box"`, "No products created yet".

**Page state:**
```tsx
type ModalState =
  | { type: 'create' }
  | { type: 'edit'; product: Product }
  | { type: 'delete'; product: Product }
  | { type: 'success'; variant: 'created' | 'updated' }
  | { type: 'fail' }
  | null
```

**Mock data shape** (`src/lib/mock/products.ts`):
```ts
interface Product {
  id: string; name: string; image: string | null
  category: string; subCategory: string; dietaryType: 'vegan' | 'meat' | null
  addOnGroups: string[]; prepTimeMin: string; prepTimeMax: string
  assignedMenus: string[]; basePrice: number; displayOrder: number
  status: 'active' | 'inactive' | 'archived'
  allergens: string[]; additives: string[]
}
```

**Add/Edit modal fields:** ProfilePictureUpload · Product Name · Description · Category + Sub-Category · Dietary Type + Add-on Groups · Min/Max Prep Time · Assigned Menus + Base Price · Display Order · AllergenAdditiveSelector section.

---

### Page — Categories Management
**File:** `src/app/(dashboard)/categories/page.tsx`

**Stat cards:** Total Categories `stat-orange` · Active `stat-green` · Inactive `stat-yellow` · Archived `stat-red`. Icon: `UtensilsCrossed`.

**Toolbar:** Left: `FilterTabs` (all/active/inactive/archived). Right: `ViewToggle` + `SearchInput` + Filters + Export + Import + "+ Add New Category" primary.

**Grid view:** 3-col `CategoryGridCard` — circular image 48px + name + `StatusToggle` top-right · 3-stat row (Products / Sub-categories / Add-ons Groups, centered counts) · footer Delete + Edit Category.

**List view columns:** checkbox · Category Name (circular image 32px + name) · Products · Sub-categories · Add-ons Groups · Description (truncated) · Creation Date · Status (`StatusToggle`) · Actions (edit + duplicate + delete + kebab).

**Empty state:** `illustration="box"`, "No categories created yet".

**Page state:**
```tsx
type ModalState =
  | { type: 'create' }
  | { type: 'edit'; category: Category }
  | { type: 'delete'; category: Category }
  | { type: 'success'; variant: 'created' | 'updated' }
  | { type: 'fail' }
  | null
```

**Mock data shape** (`src/lib/mock/categories.ts`):
```ts
interface Category {
  id: string; name: string; image: string | null
  products: number; subCategories: number; addOnGroups: number
  description: string; creationDate: string
  status: 'active' | 'inactive' | 'archived'
}
```
6 rows seeded: Sandwiches (22/2/2) · Plates (15/3/2) · Combos (20/3/0) · Starters (3/0/0) · Drinks (50/3/0) · Menu's Deals (4/0/4).

**Add/Edit modal fields (no picture upload):** inline picture upload row (UtensilsCrossed placeholder) · Category Name* · Description (textarea, optional). CTA disabled until name filled.

---

### Page — Sub-Categories Management
**File:** `src/app/(dashboard)/sub-categories/page.tsx`

**Stat cards:** Total Sub-Categories `stat-orange` · Active `stat-green` · Inactive `stat-yellow` · Archived `stat-red`. Icon: `UtensilsCrossed`.

**Toolbar:** Left: `FilterTabs` (all/active/inactive/archived). Right: `ViewToggle` + `SearchInput` + Filters + Export + Import + "+ Add New Sub-Category" primary.

**Grid view:** 3-col `SubCategoryGridCard` — parent category label (small neutral-500) above sub-category name (bold 16px) + `StatusToggle` top-right · single stat row "Products [count]" · footer Delete + Edit sub-category. No image thumbnail.

**List view columns:** checkbox · Sub-category Name · Parent Category · Products · Sub-categories · Add-on Groups · Creation Date · Status (`StatusToggle`) · Actions (edit + duplicate + delete + kebab).

**Empty state:** `illustration="box"`, "No Sub-Categories created yet".

**Page state:**
```tsx
type ModalState =
  | { type: 'create' }
  | { type: 'edit'; subCategory: SubCategory }
  | { type: 'delete'; subCategory: SubCategory }
  | { type: 'success'; variant: 'created' | 'updated' }
  | { type: 'fail' }
  | null
```

**Mock data shape** (`src/lib/mock/subCategories.ts`):
```ts
interface SubCategory {
  id: string; name: string; parentCategory: string
  products: number; subCategories: number; addOnGroups: number
  creationDate: string; status: 'active' | 'inactive' | 'archived'
  description: string
}
// parentCategoryOptions: { label, value }[] — mirrors mockCategories names
```
10 rows seeded: Bread (Laffa)/Sandwiches · Baguettes/Sandwiches · Regular Plates/Plates · Special Plates/Plates · Bread Combos/Combos · Baguettes Combos/Combos · Plates Combos/Combos · Hot Drinks/Drinks · Cold Drinks/Drinks · Coffee To Go/Drinks.

**Add/Edit modal fields (no picture upload):** Parent Category* (`SelectDropdown`, options from `parentCategoryOptions`) · Sub-category Name* · Description (textarea, optional). CTA disabled until both required fields filled.

---

## 8. Internationalization (i18n)

> The entire app is bilingual: **English (`en`, default)** and **German (`de`)**.
> Library: **next-intl**, **cookie-based locale — NO URL prefixes, no `[locale]` route segment.**
> URLs are identical in both languages (e.g. `/menus`, never `/en/menus`).

### Setup (do not change without reason)

```
next.config.ts        → wrapped with createNextIntlPlugin() (links i18n/request.ts)
i18n/request.ts       → reads NEXT_LOCALE cookie, defaults 'en', returns { locale, messages }
src/app/layout.tsx    → <html lang={locale}>, wrapped in <NextIntlClientProvider>
messages/en.json      → source of truth for English
messages/de.json      → German (must mirror en.json key-for-key)
```

- **No middleware** for locale routing. **No** next-intl navigation APIs — keep `next/link` and `next/navigation` as-is.
- `i18n/request.ts` must always **explicitly return `locale`** (cookie setup has no middleware to supply it).

### Message file structure

`messages/en.json` and `messages/de.json` share these top-level namespaces (one per module + shared):

```
common · auth · sidebar · topbar · managers · drivers · zones · restaurants · menus · products · categories · subCategories · addOnGroups
```

- Nested keys per module (e.g. `addOnGroups.table.selectionType`, `addOnGroups.modal.requiredAddOns`, `common.buttons.cancel`).
- **en.json and de.json must always have identical keys, key-for-key.** A key in one but not the other is a bug.
- Words that are legitimately identical in both languages (e.g. "Vegan", "Status", "Restaurant", "Dashboard", brand names, URL placeholders) stay identical — that is correct, not untranslated.

### Usage pattern

```tsx
// Client components
import { useTranslations } from 'next-intl'
const t = useTranslations('addOnGroups')
<button>{t('addNew')}</button>

// Server / async components
import { getTranslations } from 'next-intl/server'
const t = await getTranslations('addOnGroups')
```

### Language switcher

`src/components/ui/LanguageSelector.tsx` (topbar) — fully functional:
- Shows English + German, reflects the active locale (read from cookie).
- On selection: sets the `NEXT_LOCALE` cookie + `router.refresh()`. **URL does not change.**
- Visual design is locked — wire behavior only, never restyle.

### German layout rule ⚠️

German strings run **~30% longer** than English. Any responsive/layout work must hold for German too, not just English. High-risk elements: sidebar nav labels, buttons, filter-tab pills, stat card labels, table headers, branch pills, modal CTAs. For Add-on Groups specifically watch: the "Minimum Selection" / "Maximum Selection" / "Required/Optional" table headers and the long "+ Create Add-on Group" primary CTA. Apply safe wrap / truncate / min-width fixes using existing tokens — never hardcode widths to fit English.

### Adding i18n to a new (or existing) module

1. Add a new top-level namespace for the module in **both** `en.json` and `de.json`.
2. Extract every user-facing string into those files — labels, placeholders, buttons, modal titles/subtitles/CTAs, validation messages, empty states, table headers.
3. Replace hardcoded strings with `useTranslations` / `getTranslations`.
4. Provide accurate German for every key — never leave English in `de.json`.
5. Verify layout holds in German (see rule above).

---

## 9. Patterns

### Dashboard layout pattern
`<DashboardLayout title="...">` manages sidebar collapse. Sidebar fixed, main `marginLeft: sidebarWidth` + `padding-top: 64px`. `transition-all duration-300`.

### Modal pattern
`fixed inset-0 z-50`, `backdrop-blur-sm bg-black/40`, centered white card `rounded-[16px] shadow-dashboard-modal`. Close button top-right. `overflow-y-auto max-h-[90vh]`. Footer `flex-shrink-0 border-t`.

### Multi-step wizard pattern
```tsx
const [step, setStep] = useState(1)
const [formData, setFormData] = useState<MenuFormData>({...})
const updateForm = (patch: Partial<MenuFormData>) =>
  setFormData(prev => ({ ...prev, ...patch }))
// StepperHeader always rendered at top of scroll area
// Form data never resets on step change
```

### Collapsible sidebar group pattern
```tsx
// In Sidebar.tsx, support nav groups:
const [menuGroupOpen, setMenuGroupOpen] = useState(false)
// Auto-open when any /menus|/products|/categories|/sub-categories|/add-on-groups route is active
// Render sub-items only when open AND sidebar is expanded
// In collapsed mode: only show group icon, no sub-items
```

### Selection list with Select All pattern
```tsx
const [selected, setSelected] = useState<string[]>([])
const allIds = items.map(i => i.id)
const isAllSelected = allIds.every(id => selected.includes(id))
const toggleAll = () => setSelected(isAllSelected ? [] : allIds)
const toggleOne = (id: string) =>
  setSelected(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  )
```

### Duplicate action pattern
```tsx
// In list view Actions column: edit icon + copy icon + delete icon + kebab
// Copy icon duplicates the row immediately ("Copy of" prefix) — no confirmation modal
```

### Modal form section pattern
```tsx
<div className="space-y-4">
  <h3 className="text-primary font-semibold text-sm">Section Title</h3>
  <div className="grid grid-cols-2 gap-4">...</div>
</div>
```

### Disabled submit pattern
```tsx
const isValid = requiredFields.every(Boolean)
<Button disabled={!isValid} className={!isValid ? 'opacity-50 cursor-not-allowed' : ''}>
```

### Toggle-as-form-control pattern ← NEW
```tsx
// StatusToggle reused inside a form (Add-on Groups "Required Add-ons").
// Controlled boolean in form state, off by default. Same component as table/card toggles.
const [required, setRequired] = useState(false)
<div className="flex items-center justify-between">
  <label>Required Add-ons</label>
  <StatusToggle checked={required} onChange={setRequired} />
</div>
```

### Archived row/card pattern
```tsx
// opacity-60, text-table-archived, disabled actions
```

### Page state pattern
Discriminated union modal state. Filter as pure derived `.filter()` on render.

### Leaflet SSR pattern
```tsx
const ZoneMapEditor = dynamic(() => import('@/components/ui/ZoneMapEditor'), { ssr: false })
```

### i18n string pattern
```tsx
const t = useTranslations('addOnGroups')         // client
const t = await getTranslations('addOnGroups')   // server/async
<span>{t('table.selectionType')}</span>
// Add the key to BOTH messages/en.json and messages/de.json under the module namespace.
```

### Locale switch pattern
```tsx
document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`
router.refresh()
```

---

## Process — How to handle each new module

1. Share screens + latest `design-system.md` with Claude
2. Claude analyzes what's new vs already exists
3. Claude produces updated `design-system.md` + Claude Code prompt
4. Update the file in the project, then hand Claude Code prompt
5. Claude Code builds — no guessing, no duplication
6. Every module is built **bilingual from the start** (en + de) per §8 — strings extracted to `messages/`, German provided, layout verified in both languages. No English-first-then-retrofit.

> **Rule:** Always share the latest `design-system.md` from the project at the start of each module session.
> **Rule:** Every new module adds its own namespace to `messages/en.json` + `messages/de.json` and is fully translated before it's considered done (§8).