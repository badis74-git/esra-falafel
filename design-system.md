# Esra Falafel — Design System
> Stack: Next.js 16 + Tailwind CSS v4 (tokens via `@theme inline` in globals.css)
> Last updated: 2026-05-14 | Modules: Auth ✅ · Restaurant Managers ✅ · Delivery Drivers ✅ · Zone Management ✅ · Restaurants ✅ · Menus Management ✅

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

---

## 1. Colors

| Token | Hex | Tailwind Key | Usage |
|---|---|---|---|
| Primary | `#2D6A3F` | `primary` | Buttons, checkbox fill, active states, sidebar bg |
| Primary Dark | `#1E4D2B` | `primary-dark` | Button hover, left auth panel gradient end |
| Primary Light | `#EAF2EC` | `primary-light` | Subtle green tints, success check bg |
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
│   ├── SelectDropdown.tsx
│   ├── SearchInput.tsx
│   ├── StatusToggle.tsx
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
│   ├── PdfUploadZone.tsx            ← NEW
│   └── DietaryBadge.tsx             ← NEW
├── auth/
│   ├── AuthLayout.tsx
│   ├── OtpInput.tsx
│   └── SuccessModal.tsx
├── layout/
│   ├── Sidebar.tsx                  ← UPDATE (collapsible nav group)
│   ├── Topbar.tsx
│   └── DashboardLayout.tsx
├── managers/ [...]
├── drivers/ [...]
├── zones/ [...]
├── restaurants/ [...]
└── menus/
    ├── MenuGridCard.tsx             ← NEW
    ├── BranchPills.tsx              ← NEW
    ├── CategorySelectionRow.tsx     ← NEW
    ├── ProductSelectionRow.tsx      ← NEW
    ├── MenuWizardModal.tsx          ← NEW
    ├── UpdateMenuModal.tsx          ← NEW
    ├── DeleteMenuModal.tsx          ← NEW
    ├── SuccessModal.tsx             ← NEW
    └── FailModal.tsx                ← NEW
```

---

### `PdfUploadZone` ← Shared UI ← NEW
**File:** `src/components/ui/PdfUploadZone.tsx`
```tsx
{ file?: { name: string; date: string; size: string } | null
  onUpload: (file: File) => void
  onView?: () => void
  onDownload?: () => void
  onDelete: () => void
}
// Empty state:
//   Dashed border box rounded-lg p-6, centered content
//   Upload cloud icon (neutral-400)
//   "Click to upload" (text-primary, underline) + " or drag and drop" (neutral-500)
//   "PDF (max. 1MB)" small neutral-500 below
//   Entire zone is a drag target + hidden file input
// Filled state:
//   White row with border rounded-lg p-4
//   PDF icon (red) + file name (bold 14px) + date · size (neutral-500 small)
//   Right side: Eye icon + Download icon + Trash icon (danger color)
```

---

### `DietaryBadge` ← Shared UI ← NEW
**File:** `src/components/ui/DietaryBadge.tsx`
```tsx
{ type: 'vegan' | 'meat' }
// 'vegan': bg-vegan-badge-bg text-vegan-badge-text "🌱 Vegan"
// 'meat':  bg-meat-badge-bg text-meat-badge-text "🥩 Meat"
// rounded-full px-2 py-0.5 text-[11px] font-medium
```

---

### `StepperHeader` ← Shared UI
**File:** `src/components/ui/StepperHeader.tsx`
```tsx
{ steps: { number: number; label: string }[], currentStep: number }
// Green bg panel rounded-[12px]
// Menus steps: [{number:1,label:'Menu Information'},{number:2,label:'Categories'},
//   {number:3,label:'Products'},{number:4,label:'Overview'}]
```

---

### `EmptyState` ← Shared UI
**File:** `src/components/ui/EmptyState.tsx`
```tsx
{ title, subtitle, illustration?: 'person' | 'location' | 'box' | 'clipboard' }
// 'clipboard': notepad/clipboard illustration — used by Menus empty state
```

---

### `Sidebar` ← Dashboard Layout ← UPDATE
**File:** `src/components/layout/Sidebar.tsx`
Sidebar must support **collapsible nav groups**. Menu Management item expands to show sub-items:
```
Menu Management  ∧ (chevron toggles open/close)
  ├─ Menus
  ├─ Products
  ├─ Categories
  ├─ Sub-Categories
  ├─ Add-ons Group
  └─ Add-ons
```
- Group header: same style as nav item + ChevronUp/Down right
- Sub-items: indented `pl-8`, smaller text (12px), no icon, same hover style
- Expanded state persists while any sub-route is active
- In collapsed sidebar: show only the group icon, no sub-items visible

---

### `BranchPills` ← Menus ← NEW
**File:** `src/components/menus/BranchPills.tsx`
```tsx
{ branches: string[], maxVisible?: number }
// Each pill: bg-primary text-white rounded-full px-2 py-0.5 text-[11px]
//   Store icon (10px) + branch name
// maxVisible (default 2): if branches.length > maxVisible, show first N pills
//   then "+{remaining}" pill (same style)
// Laid out as flex-wrap gap-1
```

---

### `CategorySelectionRow` ← Menus ← NEW
**File:** `src/components/menus/CategorySelectionRow.tsx`
```tsx
{ category: { id, name, image, products: number, subCategories: string[] }
  selected: boolean
  onToggle: () => void
  expanded: boolean
  onExpandToggle: () => void
}
// Row layout: Checkbox | food image (40px rounded-lg) | name (bold) |
//   Products count + label | Sub-categories count + label | ChevronDown/Up
// Expanded panel below row:
//   "Sub-categories :" label + sub-category checkboxes inline
//   If no sub-categories: "There is no sub-categories." (neutral-500)
// Selected row: Checkbox checked (primary green)
// Border-b between rows, white bg
```

---

### `ProductSelectionRow` ← Menus ← NEW
**File:** `src/components/menus/ProductSelectionRow.tsx`
```tsx
{ product: { id, name, image, category, dietaryType, price, prepTime }
  selected: boolean
  onToggle: () => void
  view: 'grid' | 'list'
}
// Grid view row layout:
//   Checkbox | food image (56px rounded-lg) | DietaryBadge (top of name area) |
//   category (small neutral-500) | name (bold 14px) |
//   price (text-primary bold, right) + prepTime (neutral-500 small, right)
// List view columns:
//   Checkbox | image (32px) | Product Name | Category | Dietary Type | Price | Discount
// Selected: Checkbox checked (primary green)
```

---

### `MenuGridCard` ← Menus ← NEW
**File:** `src/components/menus/MenuGridCard.tsx`
```tsx
{ menu: Menu }
// White card rounded-[12px] shadow-card overflow-hidden
// Top section: menu image full width h-48 object-cover + StatusToggle (top-right, absolute)
// Below image: BranchPills (overlapping image bottom or just below)
// Body p-4:
//   Name (bold 16px) + "Last Updated: {date}" (neutral-500 small) on same row
//   Products count (bold) + "Products" label | Categories count + "Categories" label
// Footer border-t pt-3:
//   Delete (secondary, trash icon) + Edit Product (primary, edit icon)
// Archived: opacity-60, disabled buttons
```

---

### `MenuWizardModal` ← Menus ← NEW
**File:** `src/components/menus/MenuWizardModal.tsx`
```tsx
{ isOpen, onClose, onCreated }
// 4-step wizard. max-w-2xl, scrollable body.
// Header: "Add New Menu" + StatusToggle
// StepperHeader: steps 01–04
//
// Step 1 — Menu Information:
//   ProfilePictureUpload (menu picture)
//   Section "1. Menu Information" (text-primary)
//   Menu Name* (Input, 2-col, menu icon left) + Assigned Branches* (MultiSelectDropdown, 2-col)
//   Menu Description (textarea, full width, optional)
//   Menu PDF Format (PdfUploadZone, full width)
//
// Step 2 — Categories:
//   Section header "2. Categories"
//   Mini toolbar: ViewToggle (Grid/List) + SearchInput + Filters button
//   "Select All" checkbox row
//   Grid view: list of CategorySelectionRow (expandable)
//   List view: table — Category Name (image+name) | Sub-categories (comma) | Products
//   Both views: Checkbox per row, Select All works
//   Next enabled when at least 1 category selected
//
// Step 3 — Products:
//   Section header "3. Products"
//   Mini toolbar: ViewToggle + SearchInput + Filters
//   Category filter tabs: View all · [selected category names from step 2]
//   "Select All" checkbox row
//   ProductSelectionRow list (paginated — Previous/1/2/3/.../8/9/10/Next)
//   Grid view: image + badge + category + name + price + prepTime per row
//   List view: table — Product Name | Category | Dietary Type | Price | Discount
//   Next enabled when at least 1 product selected
//
// Step 4 — Overview (read-only):
//   Full summary: ProfilePictureUpload (read-only) + Step 1 fields + Step 2 categories list + Step 3 products list
//   Same mini toolbar + category tabs visible in overview for categories and products sections
//   CTA: "+ Create Menu" (primary, full width)
//
// Footer navigation:
//   Step 1: Cancel | Next → (disabled until menuName + branches filled)
//   Steps 2–3: ← Previous | Next →
//   Step 4: ← Previous | + Create Menu
// On submit → onCreated() → SuccessModal
```

---

### `UpdateMenuModal` ← Menus ← NEW
**File:** `src/components/menus/UpdateMenuModal.tsx`
```tsx
{ isOpen, menu, onClose, onSaved }
// Same 4-step wizard, pre-filled from menu prop
// Header: menu name + StatusToggle
// Final CTA: "Save Changes"
// On submit → onSaved() → SuccessModal (variant: 'updated')
```

---

### `DeleteMenuModal` ← Menus ← NEW
**File:** `src/components/menus/DeleteMenuModal.tsx`
```tsx
{ isOpen, menu, onClose, onConfirm }
// Red trash illustration
// Title: "Are You Sure You Want To Delete Menu '{menu.name}' ?"
// Subtitle: "This action is permanent and cannot be undone."
// CTAs: "Delete Menu" (bg-danger) + "Cancel" (secondary)
```

---

### `SuccessModal` (menus) ← Menus ← NEW
**File:** `src/components/menus/SuccessModal.tsx`
```tsx
{ variant: 'created' | 'updated', onGoToList, onCreateAnother? }
// variant 'created':
//   Title: "Menu Created Successfully!"
//   Subtitle: "Your menu has been set up successfully."
//   CTAs: "Go To Menus List" (primary) + "+ Create Another Menu" (secondary)
// variant 'updated':
//   Title: "Changes Saved Successfully"
//   Subtitle: "All edits have been saved and are now visible in the system."
//   CTA: "Return To Menus List" (primary, single)
```

---

### `FailModal` ← Menus ← NEW
**File:** `src/components/menus/FailModal.tsx`
Identical to other modules. "Oops! Something went wrong." + "Try Again" + "Back".

---

## 7. Pages

### Page — Menus Management ← NEW
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

**Mock data:**
```ts
// src/lib/mock/menus.ts
export const mockMenus = [
  {
    id: '1', name: 'Vegan Falafel Menu',
    image: null,
    branches: ['Esraa Falafel 1', 'Esraa Falafel 2'],
    products: 37, categories: 8,
    lastUpdated: '06/05/2026', creationDate: '11/02/2026',
    status: 'active',
    description: '',
    assignedBranches: ['Esraa Falafel 1', 'Esraa Falafel 2'],
    selectedCategories: ['Sandwiches','Plates','Combos','Drinks','Starters','Menu\'s'],
    selectedProducts: [],
  },
  {
    id: '2', name: 'Our Menu',
    image: null,
    branches: ['Esraa Falafel 3'],
    products: 25, categories: 7,
    lastUpdated: '03/01/2026', creationDate: '11/02/2026',
    status: 'active',
    description: '',
    assignedBranches: ['Esraa Falafel 3'],
    selectedCategories: [],
    selectedProducts: [],
  },
  {
    id: '3', name: 'Ramadan Special Menu',
    image: null,
    branches: ['Esraa Falafel 1', 'Esraa Falafel 2', 'Esraa Falafel 3'],
    products: 15, categories: 5,
    lastUpdated: '25/03/2026', creationDate: '10/02/2026',
    status: 'inactive',
    description: '',
    assignedBranches: ['Esraa Falafel 1', 'Esraa Falafel 2', 'Esraa Falafel 3'],
    selectedCategories: [],
    selectedProducts: [],
  },
]

export const mockCategories = [
  { id: 'c1', name: 'Sandwiches', image: null, products: 22, subCategories: ['Bread(Laffa)', 'Baguettes'] },
  { id: 'c2', name: 'Plates', image: null, products: 15, subCategories: ['Regular', 'Special'] },
  { id: 'c3', name: 'Combos', image: null, products: 20, subCategories: ['Bread Combos', 'Baguette Combos', 'Plates Combos'] },
  { id: 'c4', name: 'Drinks', image: null, products: 50, subCategories: ['Hot Drinks', 'Cold Drinks', 'Coffe To Go'] },
  { id: 'c5', name: 'Starters', image: null, products: 3, subCategories: [] },
  { id: 'c6', name: "Menu's Deals", image: null, products: 4, subCategories: [] },
]

export const mockProducts = [
  { id: 'p1', name: 'Falafel Veggies in Bread (Laffa)', image: null, category: 'Bread', dietaryType: 'vegan', price: 6.00, prepTime: '10 - 15 min', discount: 0 },
  { id: 'p2', name: 'Falafel Plate Veggies', image: null, category: 'Plates', dietaryType: 'vegan', price: 11.80, prepTime: '20 - 25 min', discount: 0 },
  { id: 'p3', name: 'Hummus', image: null, category: 'Starters', dietaryType: 'vegan', price: 3.50, prepTime: '10 - 15 min', discount: 0 },
  { id: 'p4', name: 'Falafel Makali Plate', image: null, category: 'Combos', dietaryType: 'vegan', price: 12.00, prepTime: '20 - 25 min', discount: 0 },
  { id: 'p5', name: 'Baba Ganoush', image: null, category: 'Starters', dietaryType: 'vegan', price: 3.50, prepTime: '10 - 15 min', discount: 0 },
  { id: 'p6', name: 'Grilled Merguez Plate', image: null, category: 'Plates', dietaryType: 'meat', price: 13.00, prepTime: '20 - 25 min', discount: 0 },
  { id: 'p7', name: 'Halloumi Plate Veggies', image: null, category: 'Plate', dietaryType: 'vegan', price: 11.00, prepTime: '20 - 25 min', discount: 0 },
  { id: 'p8', name: 'Sprite Drink', image: null, category: 'Drinks > Cold Drinks', dietaryType: null, price: 2.00, prepTime: '5 min', discount: 0 },
  { id: 'p9', name: 'Coca Cola Drink', image: null, category: 'Drinks > Cold Drinks', dietaryType: null, price: 2.00, prepTime: '5 min', discount: 0 },
  { id: 'p10', name: 'Althaus Tea', image: null, category: 'Drinks > Hot Drinks', dietaryType: null, price: 1.50, prepTime: '5 min', discount: 0 },
  { id: 'p11', name: 'Tabboulah Salade', image: null, category: 'Starters', dietaryType: 'vegan', price: 3.50, prepTime: '10 - 15 min', discount: 0 },
]
```

---

## 8. Patterns

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

### Collapsible sidebar group pattern ← NEW
```tsx
// In Sidebar.tsx, add support for nav groups:
const [menuGroupOpen, setMenuGroupOpen] = useState(false)
// Auto-open when any /menus/* route is active
// Render sub-items only when open AND sidebar is expanded
// In collapsed mode: only show group icon, no sub-items
```

### Selection list with Select All pattern ← NEW
```tsx
// Used in Steps 2 and 3
const [selected, setSelected] = useState<string[]>([])
const allIds = items.map(i => i.id)
const isAllSelected = allIds.every(id => selected.includes(id))

const toggleAll = () =>
  setSelected(isAllSelected ? [] : allIds)
const toggleOne = (id: string) =>
  setSelected(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  )
```

### Duplicate action pattern ← NEW
```tsx
// In list view Actions column: edit icon + copy icon + delete icon + kebab
// Copy icon triggers a duplicate of the menu (creates a copy with "Copy of" prefix)
// No confirmation modal needed — immediate action
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

---

## Process — How to handle each new module

1. Share screens + latest `design-system.md` with Claude
2. Claude analyzes what's new vs already exists
3. Claude produces updated `design-system.md` + Claude Code prompt
4. Update the file in the project, then hand Claude Code prompt
5. Claude Code builds — no guessing, no duplication

> **Rule:** Always share the latest `design-system.md` from the project at the start of each module session.
