# Esra Falafel — Design System
> Stack: Next.js 16 + Tailwind CSS v4 (tokens via `@theme inline` in globals.css) · i18n: next-intl (en/de, cookie-based)
> Last updated: 2026-06-05 | Modules: Auth ✅ · Restaurant Managers ✅ · Delivery Drivers ✅ · Zone Management ✅ · Restaurants ✅ · Menus Management ✅ · Products ✅ · Categories ✅ · Sub-Categories ✅ · Add-on Groups ✅ · Add-ons ✅
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
| Add-ons Management | ✅ Done | `/add-ons` |

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
| Card Group Label | 12px | 400 | 18px | Add-on group name above add-on name in grid card (neutral-500) |

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
│   ├── SelectDropdown.tsx            ← REUSED (Add-on Group selector)
│   ├── SearchInput.tsx
│   ├── StatusToggle.tsx              ← REUSED (header toggle + table/card)
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
│   ├── Sidebar.tsx                   ← UPDATE (activate Add-ons sub-item → /add-ons)
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
├── add-on-groups/ [...]
└── add-ons/                          ← NEW
    ├── AddOnGridCard.tsx
    ├── AddOnListRow.tsx
    ├── AddAddOnModal.tsx
    ├── EditAddOnModal.tsx
    ├── DeleteAddOnModal.tsx
    ├── SuccessModal.tsx
    └── FailModal.tsx
```

---

### `SelectDropdown` ← Shared UI ← REUSED
**File:** `src/components/ui/SelectDropdown.tsx`
Used by Add-ons for **Selection Add-on Group** field. Same behavior as in Add-on Groups module:
- Closed: input-style trigger, placeholder neutral-500, ChevronDown right.
- Open: white panel `rounded-lg shadow-lg`, options listed.
- Hover/selected option: `primary-light` row tint + green check (✓ `text-primary`) right-aligned.
- Filled trigger: selected label in neutral-900.

---

### `StatusToggle` ← Shared UI ← REUSED
**File:** `src/components/ui/StatusToggle.tsx`
Used in two contexts within Add-ons:
1. **Modal header toggle** — next to "Add New Add-on" / "Edit Add-on" title. Defaults to ON (active) for create. Pre-filled for edit.
2. **Table/card toggle** — same as all other modules (status control in list row and grid card).

---

### `Sidebar` ← Dashboard Layout ← UPDATE
**File:** `src/components/layout/Sidebar.tsx`
Menu Management group — all sub-items now active and routed:
```
Menu Management  ∧
  ├─ Menus              → /menus
  ├─ Products           → /products
  ├─ Categories         → /categories
  ├─ Sub-Categories     → /sub-categories
  ├─ Add-on Groups      → /add-on-groups
  └─ Add-ons            → /add-ons   ← NOW ACTIVE (was static before)
```
- Remove the static/disabled treatment from the "Add-ons" nav item.
- Route it to `/add-ons`.
- Expanded state persists while any `/add-ons` sub-route is active.

---

### `AddOnGridCard` ← Add-ons ← NEW
**File:** `src/components/add-ons/AddOnGridCard.tsx`
```tsx
{ addon: AddOn, onDelete, onEdit, onToggleStatus }
// White card rounded-[12px] shadow-card. NO image.
// Header section (no border):
//   Top row: group name label (12px neutral-500, truncate) left + StatusToggle right
//   Add-on name bold 16px neutral-900 (below group label, mt-1)
// Body key-value rows (label neutral-700 text-sm left, value font-medium right):
//   "Additional Price"  →  "X.XX €"
//   "Products"          →  count number
// Footer: flex items-stretch gap-2, border-t border-table-border
//   [🗑 Delete] (secondary, flex-1) — calls onDelete(addon)
//   [✏ Edit Add-on] (primary, flex-1) — calls onEdit(addon), opens EditAddOnModal in-place
// Archived: opacity-60, pointer-events-none on action buttons
```

---

### `AddOnListRow` ← Add-ons ← NEW
**File:** `src/components/add-ons/AddOnListRow.tsx`
```tsx
{ addon: AddOn, selected, onSelect, onEdit, onDuplicate, onDelete }
// Columns (matching list view mockup):
//   Checkbox | Add-on Name | Add-on Group | Additional Price | Products | Status | Actions
// Additional Price cell: "X.XX €" format (toFixed(2) + " €")
// Status cell: StatusToggle component
// Actions cell: edit (pencil) + duplicate (copy) + delete (trash) icons + kebab (⋮) menu
// Duplicate: immediate clone, "Copy of {name}" prefix, no confirmation needed
// Row hover: bg-table-row-hover
```

---

### `AddAddOnModal` ← Add-ons ← NEW
**File:** `src/components/add-ons/AddAddOnModal.tsx`
```tsx
{ isOpen: boolean, onClose: () => void, onCreated: () => void }
// Modal shell: fixed inset-0 z-50, backdrop-blur-sm bg-black/40
// White card rounded-[16px] shadow-dashboard-modal, max-w-lg, overflow-y-auto max-h-[90vh]
//
// HEADER (border-b):
//   Left: "Add New Add-on" (font-semibold text-lg neutral-900)
//   Right of title: StatusToggle (active=true by default, controls addon.status)
//   Far right: ✕ close button
//
// BODY (p-6 space-y-4):
//   1. Selection Add-on Group *
//      Label: "Selection Add-on Group *"
//      SelectDropdown, options from mockAddOnGroups (7 group names)
//      Placeholder: "Select add-ons group"
//
//   2. Add-on Name *
//      Label: "Add-on Name *"
//      Input, placeholder "Enter add-on name"
//
//   3. Additional Price
//      Label: "Additional Price"  (no asterisk — optional)
//      Input, placeholder "0.00 €"
//      Accepts numeric input; display/store as number
//
//   4. Description
//      Label: "Description"  (no asterisk — optional)
//      Textarea, placeholder "Enter description", ~4 rows
//
// FOOTER (border-t, flex gap-3):
//   Cancel (secondary/outline, flex-1)
//   "+ Create Add-on" (primary bg-primary, flex-1)
//     Disabled state: opacity-50 cursor-not-allowed
//     Enabled when: groupId is selected AND name.trim() is not empty
//
// On valid submit: call onCreated() to trigger SuccessModal (variant 'created')
```

---

### `EditAddOnModal` ← Add-ons ← NEW
**File:** `src/components/add-ons/EditAddOnModal.tsx`
```tsx
{ isOpen: boolean, addon: AddOn, onClose: () => void, onSaved: () => void }
// Identical layout to AddAddOnModal, pre-filled from addon prop:
//   groupId + groupName pre-selected in SelectDropdown
//   name, additionalPrice, description pre-filled
//   StatusToggle reflects addon.status
// Header title: "Edit Add-on"  (not "Add New Add-on")
// CTA: "Save Changes" (primary, same disabled logic)
// On valid submit: call onSaved() to trigger SuccessModal (variant 'updated')
```

---

### `DeleteAddOnModal` ← Add-ons ← NEW
**File:** `src/components/add-ons/DeleteAddOnModal.tsx`
```tsx
{ isOpen: boolean, addon: AddOn, onClose: () => void, onConfirm: () => void }
// Modal shell: rounded-[16px], max-w-sm, centered
// Illustration: red animated trash bin (same SVG/style as other delete modals)
// Title (H2 text-center font-bold):
//   "Are You Sure You Want To Delete Add-On '{addon.name}' ?"
// Subtitle (text-center text-sm neutral-500):
//   "The add-on will be permanently removed from all assigned add-on groups and products."
// CTAs (flex-col gap-3, full width each):
//   "🗑 Delete Add-on"  → bg-danger text-white rounded-lg py-3 font-semibold
//   "Cancel"            → secondary/outline
```

---

### `SuccessModal` (add-ons) ← Add-ons ← NEW
**File:** `src/components/add-ons/SuccessModal.tsx`
```tsx
{ variant: 'created' | 'updated', onGoToList: () => void, onCreateAnother?: () => void }
// Modal shell: rounded-[16px], max-w-sm, centered, close button top-right
// Illustration: green checkmark in light-green circle (primary-light bg, primary checkmark)
// variant 'created':
//   Title: "Add-on Created Successfully"
//   Subtitle: "The add-on has been added to the add-on group and is now available for management."
//   CTA 1 (primary, full width): "Return To Add-on List" → onGoToList()
//   CTA 2 (secondary, full width): "+ Create New Add-on" → onCreateAnother()
// variant 'updated':
//   Title: "Changes Saved Successfully"
//   Subtitle: "The add-on has been updated successfully."
//   CTA (primary, full width): "Return To Add-on List" → onGoToList()
```

---

### `FailModal` ← Add-ons ← NEW
**File:** `src/components/add-ons/FailModal.tsx`
```tsx
{ onTryAgain: () => void, onBack: () => void }
// Modal shell: rounded-[16px], max-w-sm, centered, close button top-right
// Illustration: yellow/amber sad document with X-eyes (same as other modules' fail modals)
// Title (H2 font-bold text-center): "Oops! Something went wrong."
// Subtitle (text-sm neutral-500 text-center): "We couldn't save the changes! Please try again."
// CTAs (flex-col gap-3, full width each):
//   "Try Again"  → bg-primary text-white rounded-lg py-3 font-semibold → onTryAgain()
//   "Back"       → secondary/outline → onBack()
```

---

## 7. Pages

### Page — Add-ons Management ← NEW
**File:** `src/app/(dashboard)/add-ons/page.tsx`

**Stat cards:** Total Add-ons `stat-orange` · Active Add-ons `stat-green` · Inactive Add-ons `stat-yellow` · Archived Add-ons `stat-red`. Icon: `UtensilsCrossed`.

**Toolbar:**
Left: `FilterTabs` (all / active / inactive / archived)
Right: `ViewToggle` + `SearchInput` + Filters button + Export button + Import button + "+ Add New Add-on" primary button

**Grid view:** 3-col `AddOnGridCard`
- Group name label (12px neutral-500) top-left + `StatusToggle` top-right
- Add-on name bold 16px neutral-900
- Key-value rows: Additional Price · Products
- Footer: `Delete` (secondary, flex-1) + `Edit Add-on` (primary, flex-1) — Edit opens EditAddOnModal in-place

**List view columns:**
checkbox · Add-on Name · Add-on Group · Additional Price · Products · Status (`StatusToggle`) · Actions (edit + duplicate + delete + kebab)

**Empty state:** `EmptyState` with `illustration="box"`, title "No add-ons created yet", subtitle "Add options that customers can choose from (e.g., Harissa, Cheese, Fries)."

**Page state:**
```tsx
type ModalState =
  | { type: 'create' }
  | { type: 'edit'; addon: AddOn }
  | { type: 'delete'; addon: AddOn }
  | { type: 'success'; variant: 'created' | 'updated' }
  | { type: 'fail' }
  | null
```

**Mock data shape** (`src/lib/mock/addOns.ts`):
```ts
interface AddOn {
  id: string
  name: string
  groupId: string       // references AddOnGroup.id
  groupName: string     // denormalized display name
  additionalPrice: number  // euros, 2 decimal places
  products: number      // count of assigned products
  description: string
  status: 'active' | 'inactive' | 'archived'
}
```

**12 rows seeded** (all active → Total 12 / Active 12 / Inactive 0 / Archived 0):
```ts
{ id: 'ao1',  name: 'Tahini Sauce',   groupId: 'ag1', groupName: 'Sauces',         additionalPrice: 0.00, products: 22, description: '', status: 'active' },
{ id: 'ao2',  name: 'Chilly',         groupId: 'ag1', groupName: 'Sauces',         additionalPrice: 0.00, products: 15, description: '', status: 'active' },
{ id: 'ao3',  name: 'Garlic Sauce',   groupId: 'ag1', groupName: 'Sauces',         additionalPrice: 0.50, products: 20, description: '', status: 'active' },
{ id: 'ao4',  name: 'Extra Falafel',  groupId: 'ag2', groupName: 'Extra Toppings', additionalPrice: 2.00, products: 3,  description: '', status: 'active' },
{ id: 'ao5',  name: 'Extra Halloumi', groupId: 'ag2', groupName: 'Extra Toppings', additionalPrice: 3.00, products: 50, description: '', status: 'active' },
{ id: 'ao6',  name: 'Bread (Laffa)',  groupId: 'ag3', groupName: 'Bread Choice',   additionalPrice: 0.00, products: 4,  description: '', status: 'active' },
{ id: 'ao7',  name: 'Baguette',       groupId: 'ag3', groupName: 'Bread Choice',   additionalPrice: 2.50, products: 4,  description: '', status: 'active' },
{ id: 'ao8',  name: 'Normal',         groupId: 'ag5', groupName: 'Spicy Level',    additionalPrice: 0.00, products: 10, description: '', status: 'active' },
{ id: 'ao9',  name: 'Medium',         groupId: 'ag5', groupName: 'Spicy Level',    additionalPrice: 0.00, products: 10, description: '', status: 'active' },
{ id: 'ao10', name: 'Spicy',          groupId: 'ag5', groupName: 'Spicy Level',    additionalPrice: 0.00, products: 10, description: '', status: 'active' },
{ id: 'ao11', name: 'Fries',          groupId: 'ag6', groupName: 'Side Choices',   additionalPrice: 2.50, products: 10, description: '', status: 'active' },
{ id: 'ao12', name: '0,33L',          groupId: 'ag7', groupName: 'Drink Upgrade',  additionalPrice: 1.00, products: 4,  description: '', status: 'active' },
```

> **groupId references** must match the IDs in `src/lib/mock/addOnGroups.ts` (ag1=Sauces, ag2=Extra Toppings, ag3=Bread Choice, ag4=Cheese Options, ag5=Spicy Level, ag6=Side Choices, ag7=Drink Upgrade).

**Price formatting rule:** Always display as `${price.toFixed(2)} €` (e.g. "0.00 €", "0.50 €", "2.50 €"). The € symbol follows the number with a space, matching German/European convention visible in mockups.

**Grid card footer convention (all modules):** Footer is `flex items-stretch gap-2` so both buttons grow to equal height. Each button has `flex-1`. Icon size is `size={14}` in both buttons. The Delete button uses `variant="secondary"` and the Edit button uses `variant="primary"`.

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

## 8. Internationalization (i18n)

> The entire app is bilingual: **English (`en`, default)** and **German (`de`)**.
> Library: **next-intl**, **cookie-based locale — NO URL prefixes, no `[locale]` route segment.**

### Setup (do not change without reason)

```
next.config.ts        → wrapped with createNextIntlPlugin()
i18n/request.ts       → reads NEXT_LOCALE cookie, defaults 'en'
src/app/layout.tsx    → <html lang={locale}>, wrapped in <NextIntlClientProvider>
messages/en.json      → source of truth for English
messages/de.json      → German (must mirror en.json key-for-key)
```

### Message file structure

Namespaces: `common · auth · sidebar · topbar · managers · drivers · zones · restaurants · menus · products · categories · subCategories · addOnGroups · addOns`

### Add-ons i18n namespace

Add `addOns` to both `messages/en.json` and `messages/de.json`:

```json
// messages/en.json — addOns namespace
"addOns": {
  "pageTitle": "Add-ons Management",
  "breadcrumb": "Admin",
  "listTitle": "Add-ons List",
  "addNew": "+ Add New Add-on",
  "stats": {
    "total": "Total Add-ons",
    "active": "Active Add-ons",
    "inactive": "Inactive Add-ons",
    "archived": "Archived Add-ons"
  },
  "filters": {
    "all": "View all",
    "active": "Active",
    "inactive": "Inactive",
    "archived": "Archived"
  },
  "table": {
    "name": "Add-on Name",
    "group": "Add-on Group",
    "price": "Additional Price",
    "products": "Products",
    "status": "Status",
    "actions": "Actions"
  },
  "card": {
    "additionalPrice": "Additional Price",
    "products": "Products",
    "editGroup": "Edit Add-on Group",
    "delete": "Delete"
  },
  "modal": {
    "addTitle": "Add New Add-on",
    "editTitle": "Edit Add-on",
    "groupLabel": "Selection Add-on Group",
    "groupRequired": "Selection Add-on Group *",
    "groupPlaceholder": "Select add-ons group",
    "nameLabel": "Add-on Name",
    "nameRequired": "Add-on Name *",
    "namePlaceholder": "Enter add-on name",
    "priceLabel": "Additional Price",
    "pricePlaceholder": "0.00 €",
    "descriptionLabel": "Description",
    "descriptionPlaceholder": "Enter description",
    "createCta": "+ Create Add-on",
    "saveCta": "Save Changes",
    "cancel": "Cancel"
  },
  "delete": {
    "title": "Are You Sure You Want To Delete Add-On '{name}' ?",
    "subtitle": "The add-on will be permanently removed from all assigned add-on groups and products.",
    "confirm": "Delete Add-on",
    "cancel": "Cancel"
  },
  "success": {
    "createdTitle": "Add-on Created Successfully",
    "createdSubtitle": "The add-on has been added to the add-on group and is now available for management.",
    "updatedTitle": "Changes Saved Successfully",
    "updatedSubtitle": "The add-on has been updated successfully.",
    "returnToList": "Return To Add-on List",
    "createAnother": "+ Create New Add-on"
  },
  "fail": {
    "title": "Oops! Something went wrong.",
    "subtitle": "We couldn't save the changes! Please try again.",
    "tryAgain": "Try Again",
    "back": "Back"
  },
  "empty": {
    "title": "No add-ons created yet",
    "subtitle": "Add options that customers can choose from (e.g., Harissa, Cheese, Fries)."
  }
}
```

```json
// messages/de.json — addOns namespace
"addOns": {
  "pageTitle": "Add-on-Verwaltung",
  "breadcrumb": "Admin",
  "listTitle": "Add-on-Liste",
  "addNew": "+ Neues Add-on hinzufügen",
  "stats": {
    "total": "Add-ons gesamt",
    "active": "Aktive Add-ons",
    "inactive": "Inaktive Add-ons",
    "archived": "Archivierte Add-ons"
  },
  "filters": {
    "all": "Alle anzeigen",
    "active": "Aktiv",
    "inactive": "Inaktiv",
    "archived": "Archiviert"
  },
  "table": {
    "name": "Add-on-Name",
    "group": "Add-on-Gruppe",
    "price": "Zusatzpreis",
    "products": "Produkte",
    "status": "Status",
    "actions": "Aktionen"
  },
  "card": {
    "additionalPrice": "Zusatzpreis",
    "products": "Produkte",
    "editGroup": "Add-on-Gruppe bearbeiten",
    "delete": "Löschen"
  },
  "modal": {
    "addTitle": "Neues Add-on hinzufügen",
    "editTitle": "Add-on bearbeiten",
    "groupLabel": "Add-on-Gruppe auswählen",
    "groupRequired": "Add-on-Gruppe auswählen *",
    "groupPlaceholder": "Add-on-Gruppe auswählen",
    "nameLabel": "Add-on-Name",
    "nameRequired": "Add-on-Name *",
    "namePlaceholder": "Add-on-Namen eingeben",
    "priceLabel": "Zusatzpreis",
    "pricePlaceholder": "0,00 €",
    "descriptionLabel": "Beschreibung",
    "descriptionPlaceholder": "Beschreibung eingeben",
    "createCta": "+ Add-on erstellen",
    "saveCta": "Änderungen speichern",
    "cancel": "Abbrechen"
  },
  "delete": {
    "title": "Möchten Sie das Add-on '{name}' wirklich löschen?",
    "subtitle": "Das Add-on wird dauerhaft aus allen zugewiesenen Add-on-Gruppen und Produkten entfernt.",
    "confirm": "Add-on löschen",
    "cancel": "Abbrechen"
  },
  "success": {
    "createdTitle": "Add-on erfolgreich erstellt",
    "createdSubtitle": "Das Add-on wurde der Add-on-Gruppe hinzugefügt und steht nun zur Verwaltung bereit.",
    "updatedTitle": "Änderungen erfolgreich gespeichert",
    "updatedSubtitle": "Das Add-on wurde erfolgreich aktualisiert.",
    "returnToList": "Zur Add-on-Liste zurückkehren",
    "createAnother": "+ Neues Add-on erstellen"
  },
  "fail": {
    "title": "Hoppla! Etwas ist schiefgelaufen.",
    "subtitle": "Die Änderungen konnten nicht gespeichert werden! Bitte versuchen Sie es erneut.",
    "tryAgain": "Erneut versuchen",
    "back": "Zurück"
  },
  "empty": {
    "title": "Noch keine Add-ons erstellt",
    "subtitle": "Fügen Sie Optionen hinzu, aus denen Kunden wählen können (z. B. Harissa, Käse, Pommes)."
  }
}
```

### German layout risk — Add-ons specific ⚠️

High-risk strings in German for Add-ons:
- `"Add-on-Gruppe bearbeiten"` (grid card footer button) → ~30% longer than "Edit Add-on Group" — allow text to wrap or use `text-sm` in the button
- `"+ Neues Add-on hinzufügen"` (toolbar CTA) → longer than "+ Add New Add-on" — ensure min-width or allow button to grow
- `"Add-on-Gruppe auswählen *"` (modal label) → longer than "Selection Add-on Group *" — label width is fluid, no fix needed but verify
- `"Zusatzpreis"` (table header / card label) → "Additional Price" → slightly shorter in German, no issue
- `"Zur Add-on-Liste zurückkehren"` (success modal CTA) → longer than "Return To Add-on List" → full-width button, wraps gracefully

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
```

### Collapsible sidebar group pattern
```tsx
const [menuGroupOpen, setMenuGroupOpen] = useState(false)
// Auto-open when any /menus|/products|/categories|/sub-categories|/add-on-groups|/add-ons route is active
```

### Selection list with Select All pattern
```tsx
const [selected, setSelected] = useState<string[]>([])
const allIds = items.map(i => i.id)
const isAllSelected = allIds.every(id => selected.includes(id))
const toggleAll = () => setSelected(isAllSelected ? [] : allIds)
```

### Duplicate action pattern
```tsx
// Copy icon in list Actions — immediate, "Copy of " prefix, no confirmation
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

### Toggle-as-form-control pattern
```tsx
// StatusToggle in modal header next to title — same component, controlled boolean
const [isActive, setIsActive] = useState(true)  // default ON for create
<div className="flex items-center gap-3">
  <h2>Add New Add-on</h2>
  <StatusToggle checked={isActive} onChange={setIsActive} />
</div>
```

### Price formatting pattern ← NEW
```tsx
// Display: ${price.toFixed(2)} €  →  "0.50 €", "2.00 €", "0.00 €"
// Input: accept numeric string, parse on submit
// Placeholder: "0.00 €"
const formatPrice = (price: number) => `${price.toFixed(2)} €`
```

### Archived row/card pattern
```tsx
// opacity-60, text-table-archived, pointer-events-none on action buttons
```

### Page state pattern
Discriminated union modal state. Filter as pure derived `.filter()` on render.

### i18n string pattern
```tsx
const t = useTranslations('addOns')          // client
const t = await getTranslations('addOns')    // server/async
<span>{t('table.price')}</span>
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
6. Every module is built **bilingual from the start** (en + de) per §8

> **Rule:** Always share the latest `design-system.md` from the project at the start of each module session.
> **Rule:** Every new module adds its own namespace to `messages/en.json` + `messages/de.json` and is fully translated before it's considered done (§8).