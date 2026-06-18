# Esra Falafel — Design System
> Stack: Next.js 16 + Tailwind CSS v4 (tokens via `@theme inline` in globals.css) · i18n: next-intl (en/de, cookie-based)
> Last updated: 2026-06-17 | Modules: Auth ✅ · Restaurant Managers ✅ · Delivery Drivers 🔄 (v2 redesign) · Zone Management ✅ · Restaurants ✅ · Menus Management ✅ · Products ✅ · Categories ✅ · Sub-Categories ✅ · Add-on Groups ✅ · Add-ons ✅
> **All modules are bilingual (English + German).** See §8 Internationalization before building or editing any module.

---

## Module Coverage

| Module | Status | Route |
|---|---|---|
| Auth (Login, Forgot PW, OTP, Reset PW) | ✅ Done | `/login`, `/forgot-password`, `/verify-otp`, `/reset-password` |
| Restaurant Managers | ✅ Done | `/managers` |
| Delivery Drivers | 🔄 v2 redesign | `/drivers` |
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
| Verified Text | `#16A34A` | `verified-text` | "Verified" status text in drivers list |
| Verified BG | `#F0FDF4` | `verified-bg` | "Verified" status pill tint |
| Pending Text | `#CA8A04` | `pending-text` | "Pending verification" status text |
| Pending BG | `#FEFCE8` | `pending-bg` | "Pending verification" status pill tint |
| Order New | `#F97316` | `order-new` | Order "New" pill (orange) |
| Order New BG | `#FFF7ED` | `order-new-bg` | Order "New" pill background + "Pick Up" section header tint |
| Order Preparing | `#3B82F6` | `order-preparing` | Order "Preparing" pill (blue) |
| Order Preparing BG | `#EFF6FF` | `order-preparing-bg` | Order "Preparing" pill background |
| Order Ready | `#2D6A3F` | `order-ready` | Order "Ready for pick up" pill (green = primary) |
| Order Ready BG | `#EAF2EC` | `order-ready-bg` | Order "Ready for pick up" pill background |
| Order OnTheWay | `#EAB308` | `order-ontheway` | Order "On the Way" pill (yellow) |
| Order OnTheWay BG | `#FEFCE8` | `order-ontheway-bg` | Order "On the Way" pill background |
| Order PickedUp | `#16A34A` | `order-pickedup` | "Picked Up" section header text (green) |
| Order PickedUp BG | `#F0FDF4` | `order-pickedup-bg` | "Picked Up" section header tint |
| Star Filled | `#F5A623` | `star-filled` | Review rating stars (filled) + rating bar chart |
| Star Empty | `#E5E7EB` | `star-empty` | Review rating stars (empty) + bar chart track |

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
| Edit Nav Item | 14px | 500 | 20px | Left-rail section label in Edit Driver modal |
| Edit Nav Active | 14px | 600 | 20px | Active left-rail section label (neutral-900) |
| Modal Title (named) | 18px | 700 | 26px | "Drew Cano" driver-name title in Edit Driver modal header |
| Order Number | 16px | 700 | 24px | "Order #34632" in assigned order card |
| Order Meta | 13px | 400 | 18px | Customer name, address, payment, items, distance in order card |
| Order Status Pill | 12px | 600 | 16px | Order status pill text (New / Preparing / Ready / On the Way) |
| Order Section Tag | 12px | 600 | 16px | "Pick Up" / "Picked Up" tag in order card header strip |
| Rating Big | 40px | 700 | 48px | "4.5" big rating number in Reviews section |
| Review Name | 14px | 600 | 20px | Reviewer name in Reviews list |
| Review Body | 13px | 400 | 18px | Review comment text (italic, quoted) |
| Review Time | 12px | 400 | 16px | Review timestamp (right-aligned, neutral-500) |

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
│   ├── DateInput.tsx                  ← NEW (DD-MM-YYYY picker, used in driver forms)
│   ├── PhotoUploadBox.tsx             ← NEW (dashed "Upload photo" tile — ID front/back, vehicle)
│   ├── FileAttachmentRow.tsx          ← NEW (PDF row: icon + name + date·size + view/download/delete)
│   ├── OrderStatusPill.tsx            ← NEW (New / Preparing / Ready for pick up / On the Way)
│   ├── RatingStars.tsx                ← NEW (1–5 star row, supports half star)
│   ├── RatingBarChart.tsx            ← NEW (5→1 horizontal distribution bars)
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
├── drivers/                          ← REDESIGNED (v2 — full rewrite, see §6 Drivers v2)
│   ├── DriverGridCard.tsx            ← list grid card (avatar, name, role+zones, phone, toggle, Delete/Edit)
│   ├── DriverListRow.tsx             ← list-view table row (Full Name, Phone, Role, Zone, Join Date, Status, Active toggle, Actions)
│   ├── DriverActionsMenu.tsx         ← kebab (⋮) dropdown: Edit · Resend Invitation · Delete
│   ├── AddDriverModal.tsx            ← 5-step create wizard shell (uses StepperHeader)
│   ├── steps/
│   │   ├── Step1PersonalInfo.tsx     ← profile pic + personal fields + zone/restaurants
│   │   ├── Step2AddressDetails.tsx   ← street/n°/zip/city + MapPreview
│   │   ├── Step3IdVerification.tsx   ← front + back ID PhotoUploadBox
│   │   ├── Step4VehicleInfo.tsx      ← vehicle pic + type + plate + registration PDF
│   │   └── Step5Overview.tsx         ← read-back of all steps + Create Driver CTA
│   ├── EditDriverModal.tsx           ← left-nav section modal shell (7 sections)
│   ├── sections/
│   │   ├── PersonalInfoSection.tsx
│   │   ├── AddressDetailsSection.tsx
│   │   ├── IdVerificationSection.tsx
│   │   ├── VehicleInfoSection.tsx
│   │   ├── AssignedOrdersSection.tsx ← order cards + grid/list + filter tabs + pagination
│   │   ├── AssignedZoneSection.tsx   ← zone+restaurants selects + ZoneMapEditor
│   │   └── ReviewsSection.tsx        ← rating summary + RatingBarChart + review list
│   ├── DriverCreatedModal.tsx        ← success after create (invite link + copy)
│   ├── ChangesSavedModal.tsx         ← success after edit save
│   ├── DeleteDriverModal.tsx         ← red trash confirm
│   └── FailModal.tsx                 ← "Oops! Something went wrong" (save failure)
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

## 6b. Delivery Drivers — v2 (REDESIGNED)

> **Full rewrite.** The previous Delivery Drivers module (invite-only flow) is replaced. v2 has two distinct flows:
> 1. **Add New Driver** — a **5-step wizard** (StepperHeader, same pattern as menus).
> 2. **Edit Driver** — a **left-rail section modal** (NOT a wizard) titled with the driver's name, with a status toggle in the header and 7 navigable sections. Each section saves independently via "Save Changes".
>
> List page keeps the standard shell (4 stat cards, FilterTabs, Grid/List ViewToggle, Search, Export, Import, "+ Add New Delivery Driver").

---

### Shared UI — NEW components introduced by Drivers v2

#### `DateInput` ← Shared UI ← NEW
**File:** `src/components/ui/DateInput.tsx`
```tsx
{ value: string, onChange: (v: string) => void, placeholder?: string }
// Input-style trigger, calendar/cake icon left, ChevronDown right.
// Placeholder "DD-MM-YYYY" (neutral-500). Used for Date of Birth.
// Opens a date picker popover; stores ISO, displays DD-MM-YYYY. Optional field (no asterisk).
```

#### `PhotoUploadBox` ← Shared UI ← NEW
**File:** `src/components/ui/PhotoUploadBox.tsx`
```tsx
{ label?: string, value?: string, onUpload, onRemove, aspect?: 'wide' | 'square' }
// Empty: dashed border rounded-lg, centered image-plus icon + "Upload photo" (neutral-500).
// Filled: shows uploaded image thumbnail (object-cover), remove on hover.
// Used by: ID Verification (front/back, wide), Vehicle Picture (square ~120px).
```

#### `FileAttachmentRow` ← Shared UI ← NEW
**File:** `src/components/ui/FileAttachmentRow.tsx`
```tsx
{ fileName: string, date: string, size: string, onView, onDownload, onDelete }
// Left: red "PDF" badge icon. Middle: file name (font-medium) + meta "16 Mai 2026 · 12:30 · 5MB" (neutral-500 text-xs).
// Right: 3 icon buttons — eye (view), download, trash (text-danger).
// Used by: Vehicle Info registration document (filled state) + Overview read-back.
```

#### `OrderStatusPill` ← Shared UI ← NEW
**File:** `src/components/ui/OrderStatusPill.tsx`
```tsx
{ status: 'new' | 'preparing' | 'ready' | 'ontheway' }
// Rounded-full pill, 12px font-semibold. Color map:
//   new        → text order-new      / bg order-new-bg        ("New")
//   preparing  → text order-preparing / bg order-preparing-bg ("Preparing")
//   ready      → text white          / bg order-ready          ("Ready for pick up")  ← solid green
//   ontheway   → text order-ontheway / bg order-ontheway-bg   ("On the Way")
// Labels are i18n keys; see §8 drivers.orders.status.*
```

#### `RatingStars` ← Shared UI ← NEW
**File:** `src/components/ui/RatingStars.tsx`
```tsx
{ value: number, size?: number }   // value 0–5, supports .5 half star
// Star row: filled = star-filled, empty = star-empty, half = half-filled star icon.
```

#### `RatingBarChart` ← Shared UI ← NEW
**File:** `src/components/ui/RatingBarChart.tsx`
```tsx
{ distribution: { 5:n, 4:n, 3:n, 2:n, 1:n } }
// 5 rows top→bottom (5,4,3,2,1). Each: digit label left + horizontal bar.
// Bar fill = star-filled, track = star-empty. Width = count / max * 100%.
```

---

### `DriverActionsMenu` ← Drivers ← NEW
**File:** `src/components/drivers/DriverActionsMenu.tsx`
```tsx
{ driver: Driver, onEdit, onResendInvite, onDelete }
// Triggered by the kebab (⋮) in list row / table Actions.
// White rounded-[12px] shadow-lg popover, 3 items each with icon:
//   ✏  Edit                → onEdit(driver)            (opens EditDriverModal)
//   ➤  Resend Invitation    → onResendInvite(driver)
//   🗑  Delete               → onDelete(driver)          (text-danger, opens DeleteDriverModal)
// Matches the floating menu in the "3 points drop down" screen.
```

---

### `DriverGridCard` ← Drivers ← NEW
**File:** `src/components/drivers/DriverGridCard.tsx`
```tsx
{ driver: Driver, onDelete, onEdit, onToggleStatus }
// White card rounded-[12px] shadow-card.
// Body (centered, primary-light subtle tint block):
//   StatusToggle top-right (active/inactive)
//   Avatar (rounded-full, centered)
//   Name bold 16px neutral-900 (centered)
//   "Delivery Driver : {zones}" (text-sm neutral-700, centered)  e.g. "Zone A" or "Zone A, Zone B"
//   Phone (text-sm neutral-700, centered)
// Footer: flex items-stretch gap-2, border-t
//   [🗑 Delete] (secondary, flex-1) + [✏ Edit] (primary, flex-1)
// Edit opens EditDriverModal. Archived: opacity-60, actions pointer-events-none.
```

---

### `DriverListRow` ← Drivers ← NEW
**File:** `src/components/drivers/DriverListRow.tsx`
```tsx
{ driver: Driver, selected, onSelect, onEdit, onDelete, onResendInvite, onToggleStatus }
// Columns (match List View screen):
//   Checkbox | Full Name (avatar + name + email below) | Phone | Role | Assigned Zone
//   | Join Date | Status | Active/Inactive (StatusToggle) | Actions
// Full Name cell: Avatar + name (font-medium) over email (text-xs neutral-500).
// Role cell: "Delivery Driver".
// Status cell: verification pill — "Verified" (verified-text/verified-bg) OR
//              "Pending verification" (pending-text/pending-bg). NOT the active toggle.
// Active/Inactive cell: StatusToggle (separate from verification status).
// Actions cell: ✏ edit + 🗑 delete + ⋮ kebab (DriverActionsMenu).
// Row hover: bg-table-row-hover.
```

---

### `AddDriverModal` ← Drivers ← NEW (5-step wizard)
**File:** `src/components/drivers/AddDriverModal.tsx`
```tsx
{ isOpen, onClose, onCreated: (driver) => void }
// Modal shell: fixed inset-0 z-50, backdrop-blur-sm bg-black/40.
// White card rounded-[16px] shadow-dashboard-modal, max-w-3xl, overflow-y-auto max-h-[90vh].
// HEADER (border-b): "Add New Driver" (font-semibold text-lg) + ✕ close.
// STEPPER: <StepperHeader> green gradient bar, rounded-[12px], 5 numbered steps:
//   01 Personal Info · 02 Address Details · 03 ID Verification · 04 Vehicle Info · 05 Overview
//   Current step = white circle w/ green number + white label; done/upcoming = translucent.
// BODY: renders steps/Step{N}.tsx inside a white inner card rounded-[12px].
// Wizard state (multi-step wizard pattern, §9):
//   const [step, setStep] = useState(1)
//   const [formData, setFormData] = useState<DriverFormData>({...})
// Step footers:
//   Step 1: [Cancel] (secondary) + [Next →] (primary, disabled until required valid)
//   Steps 2–4: [← Previous] (secondary) + [Next →] (primary)
//   Step 5: [← Previous] + [+ Create Driver] (primary)
// On Create Driver → onCreated() → DriverCreatedModal.
```

#### `steps/Step1PersonalInfo` ← NEW
```tsx
// Top row: ProfilePictureUpload (avatar + "Profile picture / PNG, JPEG under 15MB")
//   Empty → [⬆ Upload Picture] (secondary).  Filled → [🗑 Delete] (text-danger).
// Divider, then section title "1. Personal Information" (Section Title green).
// Grid 2-col gap-4:
//   First Name *  (user icon)   | Last Name *  (user icon)
//   Email *       (mail icon)   | Phone Number * (PhoneInput, DE default +49)
//   Date of Birth (DateInput, full width, optional)
//   Assigned Zone * (SelectDropdown "Select zone") | Assigned Restaurants * (MultiSelectDropdown "Select restaurants")
// Required to enable Next: First, Last, Email, Phone, Zone, Restaurants.
```

#### `steps/Step2AddressDetails` ← NEW
```tsx
// Section title "2. Address Details".
// Grid 2-col gap-4: Street | N° ; Zip | City  (all optional — Next enabled by default per screens).
// Below fields: <MapPreview> (rounded-lg) once address has content (filled screen shows Bern map).
//   Empty state: no map shown, Next still enabled.
```

#### `steps/Step3IdVerification` ← NEW
```tsx
// Section title "3. ID Verification".
// Grid 2-col gap-4: PhotoUploadBox "Front ID Picture" | PhotoUploadBox "Back ID Picture" (both wide, dashed).
// Footer: [← Previous] + [Next →] (enabled — uploads optional at create; required shown in Overview).
```

#### `steps/Step4VehicleInfo` ← NEW
```tsx
// Section title "4. Vehicle Information".
// Vehicle Picture: PhotoUploadBox (square ~120px).
// Grid 2-col: Vehicle Type (SelectDropdown w/ emoji options, e.g. "🛵 Motorcycle / Scooter")
//             | License Plate Number (Input, placeholder "12345678").
// Registration Document: PdfUploadZone (REUSED) — "Click to upload or drag and drop / PDF (max. 1MB)".
//   Filled → FileAttachmentRow (PDF badge + name + 16 Mai 2026·12:30·5MB + view/download/delete).
// Footer: [← Previous] + [Next →] (disabled until vehicle type chosen + plate entered, per empty screen).
```

#### `steps/Step5Overview` ← NEW
```tsx
// Read-back of all sections in one scroll: Personal Information, Address Details (+map),
// ID Verification, Vehicle Information — fields shown filled/disabled, asterisks on required.
// Profile pic row keeps [🗑 Delete]. Section titles in green (Section Title).
// Footer: [← Previous] + [+ Create Driver] (primary). On submit → onCreated().
```

---

### `EditDriverModal` ← Drivers ← NEW (left-rail section modal)
**File:** `src/components/drivers/EditDriverModal.tsx`
```tsx
{ isOpen, driver: Driver, onClose, onSaved: () => void, onToggleStatus }
// Modal shell: rounded-[16px] shadow-dashboard-modal, max-w-5xl, overflow-y-auto max-h-[92vh].
// HEADER (no stepper): driver name "Drew Cano" (Modal Title named, bold) + StatusToggle inline + ✕ close.
// TWO-PANE layout (flex gap-6):
//   LEFT RAIL — "General" group label, white/tinted rounded card, 7 nav items, each = icon tile + label:
//     👤 Personal Information   (default active)
//     📍 Address Details
//     📄 ID Verification
//     🗓 Vehicle Information
//     🛍 Assigned Orders
//     📍 Assigned Zone & Restaurants
//     ⭐ Reviews
//   Active item: white pill, neutral-900 bold, green icon tile. Inactive: green icon tile, neutral-700.
//   RIGHT PANE — white inner card rounded-[12px], renders the active sections/*.tsx.
// Each section has its OWN footer: [Cancel] (secondary) + [💾 Save Changes] (primary).
//   Save → onSaved() → ChangesSavedModal.  Failure → FailModal.
// const [activeSection, setActiveSection] = useState<DriverEditSection>('personal')
```

#### `sections/PersonalInfoSection` ← NEW
```tsx
// Header title "Personal Information" (green). Profile pic row (avatar + label + [🗑 Delete]).
// Same fields as wizard Step 1: First/Last (filled), Email, Phone (DE +49), Date of Birth.
// (Zone/Restaurants live in their own "Assigned Zone & Restaurants" section here, not duplicated.)
// Footer: Cancel + Save Changes.
```

#### `sections/AddressDetailsSection` ← NEW
```tsx
// "Address Details" (green). Grid: Street | N° ; Zip | City. <MapPreview> below. Cancel + Save Changes.
```

#### `sections/IdVerificationSection` ← NEW
```tsx
// "ID Verification" (green). Front ID Picture * | Back ID Picture * (PhotoUploadBox, dashed, required asterisks).
// Cancel + Save Changes.
```

#### `sections/VehicleInfoSection` ← NEW
```tsx
// "Vehicle Information" (green). Vehicle Picture (square) + Vehicle Type (SelectDropdown w/ emoji)
// + License Plate Number * + Registration Document * (FileAttachmentRow). Cancel + Save Changes.
```

#### `sections/AssignedOrdersSection` ← NEW
```tsx
{ orders: AssignedOrder[] }
// "Assigned Orders" (green).
// Toolbar: ViewToggle (Grid/List) + SearchInput + Filters button.
// FilterTabs: View all · Pending · Completed · Cancelled.
// Order card (vertical list, each rounded-[12px] border):
//   HEADER STRIP (tinted by pickup state):
//     left tag — "Pick Up" (order-new-bg tint) or "Picked Up" (order-pickedup-bg tint) [Order Section Tag]
//     center — time hint ("At 11:45 PM" / "In 2min" / "In 15min" / "At 10:30 PM")
//     right — restaurant name ("Esra Falafel 1" / "Esra Falafel 2")
//   BODY:
//     "Order #34632" (Order Number) + OrderStatusPill right (new/preparing/ready/ontheway)
//     👤 customer name · 📍 address (Order Meta)
//     bottom row (3 cells, divided): 💳/💵 payment + amount · 🛍 "N items" · 📍 "X.XKm"
// Pagination row: ← Previous · 1 2 3 … 8 9 10 · Next → (numbered, ellipsis).
// Footer (section-level): Cancel + Save Changes.
```

#### `sections/AssignedZoneSection` ← NEW
```tsx
// "Assigned Zone & Restaurants" (green).
// Grid 2-col: Assigned Zone (SelectDropdown "Zone A") | Assigned Restaurants (MultiSelectDropdown
//   showing "Esra Falafel 1 - Esra Falafel 2").
// <ZoneMapEditor> (REUSED) below — interactive map with zone polygon + restaurant markers,
//   left toolbar (label/edit/delete/restaurant) + zoom +/− controls. Cancel + Save Changes.
```

#### `sections/ReviewsSection` ← NEW
```tsx
{ rating: number, reviews: Review[] }
// "Reviews" (green).
// Summary row: big "4.5" (Rating Big) + RatingStars(value) under it + "(3 Reviews)" (neutral-500)
//   on the left; RatingBarChart on the right (5→1 distribution).
// Review list: each = Avatar + name (Review Name) + RatingStars(small) + timestamp right (Review Time)
//   + quoted comment below (Review Body, italic). Cancel + Save Changes.
// (Reviews are read-only display; Save Changes present for layout consistency.)
```

---

### `DriverCreatedModal` ← Drivers ← NEW
**File:** `src/components/drivers/DriverCreatedModal.tsx`
```tsx
{ email: string, inviteLink: string, onReturnToList, onCreateAnother }
// rounded-[16px], max-w-md, centered, ✕ top-right.
// Illustration: green "add contact / id-card" badge in light circle.
// Title (H2 bold center): "Driver Created Successfully"
// Subtitle (center, neutral-500): "An invitation link has been sent to {email}.
//   You can also copy the link below and share it manually."
// Invite row: read-only Input showing link + [Copy] button (primary, small) right inside the field.
// CTAs (flex-col gap-3):
//   "Return To Drivers List" (primary, full) → onReturnToList
//   "+ Create New Driver"    (secondary, full) → onCreateAnother
```

---

### `ChangesSavedModal` ← Drivers ← NEW
**File:** `src/components/drivers/ChangesSavedModal.tsx`
```tsx
{ onReturnToList }
// rounded-[16px], max-w-sm, centered, ✕ top-right.
// Illustration: green check in light-green document circle.
// Title (H2 bold center): "Changes Saved Successfully"
// Subtitle (center, neutral-500): "All edits have been saved and are now visible in the system."
// CTA: "Return To Drivers List" (primary, full) → onReturnToList.
```

---

### `DeleteDriverModal` ← Drivers ← NEW
**File:** `src/components/drivers/DeleteDriverModal.tsx`
```tsx
{ driver: Driver, onConfirm, onCancel }
// rounded-[16px], max-w-md, centered, ✕ top-right.
// Illustration: red animated trash bin (shared delete illustration).
// Title (H2 bold center): "Are You Sure You Want To Delete Driver '{driver.name}' ?"
// Subtitle (center, neutral-500): "This delivery driver will no longer be able to access the
//   system or track orders. All his activity and history will be saved."
// CTAs (flex-col gap-3):
//   "🗑 Delete Driver" → bg-danger text-white rounded-lg py-3 font-semibold → onConfirm
//   "Cancel"           → secondary/outline → onCancel
```

---

### `FailModal` (drivers) ← Drivers ← NEW
**File:** `src/components/drivers/FailModal.tsx`
```tsx
{ onTryAgain, onBack }
// rounded-[16px], max-w-sm, centered, ✕ top-right.
// Illustration: amber/yellow sad document with X-eyes (shared fail illustration).
// Title (H2 bold center): "Oops! Something went wrong."
// Subtitle (center, neutral-500): "We couldn't save the changes! Please try again."
// CTAs (flex-col gap-3):
//   "Try Again" (primary, full) → onTryAgain
//   "Back"      (secondary, full) → onBack
```

---

### REUSED components in Drivers v2 (do NOT redefine)
- `StepperHeader` — 5-step green gradient bar in AddDriverModal.
- `MapPreview` — address map in Step 2 / Address section / Overview.
- `ZoneMapEditor` — interactive zone+restaurant map in Assigned Zone section.
- `PdfUploadZone` — registration document upload (empty state) in Vehicle steps.
- `ProfilePictureUpload` — profile picture row (upload/delete).
- `PhoneInput` — DE-default phone field.
- `SelectDropdown` — Zone, Vehicle Type.
- `MultiSelectDropdown` — Assigned Restaurants.
- `StatusToggle` — grid card, list row Active/Inactive, Edit modal header.
- `FilterTabs` · `ViewToggle` · `SearchInput` · `StatCard` · `EmptyState` · `Avatar` · `Button` · `Input`.

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

### Page — Delivery Drivers ← REDESIGNED (v2)
**File:** `src/app/(dashboard)/drivers/page.tsx`

**Stat cards (4):** Total Delivery Drivers `stat-orange` · Active Delivery Drivers `stat-green` · Inactive Delivery Drivers `stat-yellow` · Archived Delivery Drivers `stat-red`. Icon: `User` / contact glyph. Trend % under each (e.g. ↓2.1%, ↑1.5%, ↑2.4%).

**Toolbar:**
Left: `FilterTabs` (View all / Inactive / Active / Archived)
Right: `ViewToggle` (Grid / List) + `SearchInput` + Filters button + Export + Import + "+ Add New Delivery Driver" (primary)

**Grid view:** 3-col `DriverGridCard` — avatar, name, "Delivery Driver : {zones}", phone, `StatusToggle` top-right, footer Delete + Edit.

**List view columns:**
checkbox · Full Name (avatar + name + email) · Phone · Role · Assigned Zone · Join Date · Status (verification pill: Verified / Pending verification) · Active/Inactive (`StatusToggle`) · Actions (edit + delete + kebab `DriverActionsMenu`)

> **Two independent status concepts** — keep them separate:
> - **Verification status** (`Verified` / `Pending verification`) → shown as a colored text pill in the *Status* column. Drives nothing else.
> - **Active/Inactive** (`StatusToggle`) → the activation toggle, its own column, also on grid card + edit modal header.

**Empty state:** `EmptyState` illustration scooter/food, title "No Active Delivery Drivers", subtitle "Send an invitation to add users to your system." (Stat counts all 0.)

**Create flow:** "+ Add New Delivery Driver" → `AddDriverModal` (5-step wizard) → on Create → `DriverCreatedModal`.
**Edit flow:** Edit (card/row/kebab) → `EditDriverModal` (section modal) → Save → `ChangesSavedModal`; on failure → `FailModal`.
**Delete flow:** Delete (card/row/kebab) → `DeleteDriverModal`.
**Resend invite:** kebab → Resend Invitation (toast/no modal).

**Page state:**
```tsx
type ModalState =
  | { type: 'create' }
  | { type: 'created'; email: string; inviteLink: string }
  | { type: 'edit'; driver: Driver; section?: DriverEditSection }
  | { type: 'saved' }
  | { type: 'fail' }
  | { type: 'delete'; driver: Driver }
  | null

type DriverEditSection =
  | 'personal' | 'address' | 'id' | 'vehicle' | 'orders' | 'zone' | 'reviews'
```

**Mock data shape** (`src/lib/mock/drivers.ts`):
```ts
interface Driver {
  id: string
  firstName: string
  lastName: string
  avatar: string
  email: string
  phone: string                 // "+49 76 234 56 81"
  dateOfBirth?: string          // ISO; display DD-MM-YYYY
  role: 'Delivery Driver'
  zones: string[]               // ["Zone A"] | ["Zone A","Zone B"]
  restaurants: string[]         // ["Esra Falafel 1","Esra Falafel 2"]
  address: { street: string; number: string; zip: string; city: string }
  idFront?: string; idBack?: string
  vehicle: { picture?: string; type: string; plate: string; registrationDoc?: FileMeta }
  joinDate: string              // "11/02/2026"
  verification: 'verified' | 'pending'
  status: 'active' | 'inactive' | 'archived'
  rating: number                // 4.5
  reviews: Review[]
  assignedOrders: AssignedOrder[]
}

interface FileMeta { name: string; date: string; size: string; url: string }

interface Review {
  id: string; reviewer: string; avatar: string
  rating: number; comment: string; time: string   // "Today, 09:12" | "Yesterday, 16:40" | "10/05/2026"
}

interface AssignedOrder {
  id: string; number: string                       // "#34632"
  pickupState: 'pickup' | 'pickedup'
  timeHint: string                                  // "At 11:45 PM" | "In 2min"
  restaurant: string                                // "Esra Falafel 1"
  status: 'new' | 'preparing' | 'ready' | 'ontheway'
  customer: string; address: string
  payment: { method: 'card' | 'cash'; amount: number }
  items: number; distanceKm: number
}
```

**3 drivers seeded** (matches screens → Total 3 / Active 2 / Inactive 1 / Archived 0):
```ts
{ id:'d1', firstName:'Orlando', lastName:'Diggs', email:'orlando@company.com',
  phone:'+49 76 234 56 81', role:'Delivery Driver', zones:['Zone A'],
  restaurants:['Esra Falafel 1','Esra Falafel 2'], joinDate:'11/02/2026',
  verification:'verified', status:'active', rating:4.5, /* ... */ },
{ id:'d2', firstName:'Drew', lastName:'Cano', email:'drew@company.com',
  phone:'+49 78 945 23 67', role:'Delivery Driver', zones:['Zone A','Zone B'],
  restaurants:['Esra Falafel 1','Esra Falafel 2'], joinDate:'11/02/2026',
  verification:'verified', status:'active', rating:4.5, /* full orders+reviews */ },
{ id:'d3', firstName:'Luca', lastName:'Muller', email:'lucamuller@company.com',
  phone:'+49 79 312 84 59', role:'Delivery Driver', zones:['Zone C'],
  restaurants:[], joinDate:'10/02/2026',
  verification:'pending', status:'inactive', rating:0, /* ... */ },
```

> **Address example used in screens:** Musterstrasse 12, 3000 Bern. **Vehicle example:** 🛵 Motorcycle / Scooter, plate 12345678, registration "File Name.pdf · 16 Mai 2026 · 12:30 · 5MB". Use these in d2 (Drew Cano) so the Edit modal screens reproduce exactly.

> **Assigned orders seed (Drew Cano)** — 4 cards per the screen:
> `#34632` pickedup · "At 11:45 PM" · Esra Falafel 1 · ontheway · Liam Becker · Skalitzer Straße 88, 10997 Berlin · card €14.50 · 2 items · 4.5Km
> `#34551` pickup · "In 2min" · Esra Falafel 2 · ready · Emma Schneider · Reichenberger Straße 42, 10999 Berlin · cash €16.00 · 2 items · 3.5Km
> `#34552` pickup · "In 15min" · Esra Falafel 2 · preparing · Laura Fischer · Schönhauser Allee 73, 10437 Berlin · card €22.50 · 2 items · 4.2Km
> `#34432` pickup · "At 10:30 PM" · Esra Falafel 1 · new · Noah Wagner · Warschauer Straße 51, 10243 Berlin · cash €32.00 · 3 items · 4.5Km

> **Reviews seed (Drew Cano)** — rating 4.5, 3 reviews:
> Victoria Champain ★★★★★ "Great Service" · Today, 09:12
> Laura Smith ★★★☆☆ "Friendly Driver" · Yesterday, 16:40
> Maximilian W. ★★★★☆ "Professional, Careful Handling" · 10/05/2026

---


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

### Delivery Drivers i18n namespace ← v2 (REPLACE existing `drivers`)

> Replace the old `drivers` namespace in both `messages/en.json` and `messages/de.json` with the v2 keys below. German must mirror English key-for-key.

```json
// messages/en.json — drivers namespace (v2)
"drivers": {
  "pageTitle": "Delivery Drivers",
  "breadcrumb": "Admin",
  "listTitle": "Delivery Drivers List",
  "addNew": "+ Add New Delivery Driver",
  "export": "Export",
  "import": "Import",
  "stats": {
    "total": "Total Delivery Drivers",
    "active": "Active Delivery Drivers",
    "inactive": "Inactive Delivery Drivers",
    "archived": "Archived Delivery Drivers"
  },
  "filters": { "all": "View all", "inactive": "Inactive", "active": "Active", "archived": "Archived" },
  "view": { "grid": "Grid View", "list": "List View" },
  "table": {
    "fullName": "Full Name", "phone": "Phone", "role": "Role", "zone": "Assigned Zone",
    "joinDate": "Join Date", "status": "Status", "activeInactive": "Active/Inactive", "actions": "Actions"
  },
  "verification": { "verified": "Verified", "pending": "Pending verification" },
  "role": "Delivery Driver",
  "card": { "roleZone": "Delivery Driver : {zones}", "delete": "Delete", "edit": "Edit" },
  "actionsMenu": { "edit": "Edit", "resend": "Resend Invitation", "delete": "Delete" },
  "wizard": {
    "title": "Add New Driver",
    "steps": { "personal": "Personal Info", "address": "Address Details", "id": "ID Verification", "vehicle": "Vehicle Info", "overview": "Overview" },
    "cancel": "Cancel", "next": "Next", "previous": "Previous", "create": "+ Create Driver"
  },
  "profile": { "label": "Profile picture", "hint": "PNG, JPEG under 15MB", "upload": "Upload Picture", "delete": "Delete" },
  "personal": {
    "sectionTitle": "Personal Information",
    "firstName": "First Name", "lastName": "Last Name", "email": "Email",
    "phone": "Phone Number", "dob": "Date of Birth", "dobPlaceholder": "DD-MM-YYYY",
    "firstNamePlaceholder": "First Name", "emailPlaceholder": "email@domain.com",
    "zone": "Assigned Zone", "zonePlaceholder": "Select zone",
    "restaurants": "Assigned Restaurants", "restaurantsPlaceholder": "Select restaurants"
  },
  "address": {
    "sectionTitle": "Address Details",
    "street": "Street", "number": "N°", "zip": "Zip", "city": "City"
  },
  "id": {
    "sectionTitle": "ID Verification",
    "front": "Front ID Picture", "back": "Back ID Picture", "uploadPhoto": "Upload photo"
  },
  "vehicle": {
    "sectionTitle": "Vehicle Information",
    "picture": "Vehicle Picture", "uploadPhoto": "Upload photo",
    "type": "Vehicle Type", "typePlaceholder": "Vehicle Type",
    "typeMotorcycle": "Motorcycle / Scooter", "typeCar": "Car", "typeBicycle": "Bicycle",
    "plate": "License Plate Number", "platePlaceholder": "12345678",
    "registration": "Registration Document",
    "uploadCta": "Click to upload", "uploadRest": " or drag and drop", "uploadHint": "PDF (max. 1MB)"
  },
  "orders": {
    "sectionTitle": "Assigned Orders",
    "filters": { "all": "View all", "pending": "Pending", "completed": "Completed", "cancelled": "Cancelled" },
    "searchPlaceholder": "Search", "filtersBtn": "Filters",
    "pickup": "Pick Up", "pickedUp": "Picked Up",
    "order": "Order", "items": "{count} items", "km": "{distance}Km",
    "status": { "new": "New", "preparing": "Preparing", "ready": "Ready for pick up", "ontheway": "On the Way" }
  },
  "zone": {
    "sectionTitle": "Assigned Zone & Restaurants",
    "zone": "Assigned Zone", "restaurants": "Assigned Restaurants"
  },
  "reviews": {
    "sectionTitle": "Reviews",
    "count": "({count} Reviews)"
  },
  "edit": {
    "navGroup": "General",
    "nav": {
      "personal": "Personal Information", "address": "Address Details", "id": "ID Verification",
      "vehicle": "Vehicle Information", "orders": "Assigned Orders",
      "zone": "Assigned Zone & Restaurants", "reviews": "Reviews"
    },
    "cancel": "Cancel", "save": "Save Changes"
  },
  "created": {
    "title": "Driver Created Successfully",
    "subtitle": "An invitation link has been sent to {email}. You can also copy the link below and share it manually.",
    "copy": "Copy", "returnToList": "Return To Drivers List", "createAnother": "+ Create New Driver"
  },
  "saved": {
    "title": "Changes Saved Successfully",
    "subtitle": "All edits have been saved and are now visible in the system.",
    "returnToList": "Return To Drivers List"
  },
  "delete": {
    "title": "Are You Sure You Want To Delete Driver '{name}' ?",
    "subtitle": "This delivery driver will no longer be able to access the system or track orders. All his activity and history will be saved.",
    "confirm": "Delete Driver", "cancel": "Cancel"
  },
  "fail": { "title": "Oops! Something went wrong.", "subtitle": "We couldn't save the changes! Please try again.", "tryAgain": "Try Again", "back": "Back" },
  "empty": { "title": "No Active Delivery Drivers", "subtitle": "Send an invitation to add users to your system." }
}
```

```json
// messages/de.json — drivers namespace (v2)
"drivers": {
  "pageTitle": "Lieferfahrer",
  "breadcrumb": "Admin",
  "listTitle": "Lieferfahrer-Liste",
  "addNew": "+ Neuen Lieferfahrer hinzufügen",
  "export": "Exportieren",
  "import": "Importieren",
  "stats": {
    "total": "Lieferfahrer gesamt",
    "active": "Aktive Lieferfahrer",
    "inactive": "Inaktive Lieferfahrer",
    "archived": "Archivierte Lieferfahrer"
  },
  "filters": { "all": "Alle anzeigen", "inactive": "Inaktiv", "active": "Aktiv", "archived": "Archiviert" },
  "view": { "grid": "Rasteransicht", "list": "Listenansicht" },
  "table": {
    "fullName": "Vollständiger Name", "phone": "Telefon", "role": "Rolle", "zone": "Zugewiesene Zone",
    "joinDate": "Beitrittsdatum", "status": "Status", "activeInactive": "Aktiv/Inaktiv", "actions": "Aktionen"
  },
  "verification": { "verified": "Verifiziert", "pending": "Verifizierung ausstehend" },
  "role": "Lieferfahrer",
  "card": { "roleZone": "Lieferfahrer : {zones}", "delete": "Löschen", "edit": "Bearbeiten" },
  "actionsMenu": { "edit": "Bearbeiten", "resend": "Einladung erneut senden", "delete": "Löschen" },
  "wizard": {
    "title": "Neuen Fahrer hinzufügen",
    "steps": { "personal": "Persönliche Daten", "address": "Adressdaten", "id": "ID-Verifizierung", "vehicle": "Fahrzeugdaten", "overview": "Übersicht" },
    "cancel": "Abbrechen", "next": "Weiter", "previous": "Zurück", "create": "+ Fahrer erstellen"
  },
  "profile": { "label": "Profilbild", "hint": "PNG, JPEG unter 15MB", "upload": "Bild hochladen", "delete": "Löschen" },
  "personal": {
    "sectionTitle": "Persönliche Informationen",
    "firstName": "Vorname", "lastName": "Nachname", "email": "E-Mail",
    "phone": "Telefonnummer", "dob": "Geburtsdatum", "dobPlaceholder": "TT-MM-JJJJ",
    "firstNamePlaceholder": "Vorname", "emailPlaceholder": "email@domain.com",
    "zone": "Zugewiesene Zone", "zonePlaceholder": "Zone auswählen",
    "restaurants": "Zugewiesene Restaurants", "restaurantsPlaceholder": "Restaurants auswählen"
  },
  "address": {
    "sectionTitle": "Adressdaten",
    "street": "Straße", "number": "Nr.", "zip": "PLZ", "city": "Stadt"
  },
  "id": {
    "sectionTitle": "ID-Verifizierung",
    "front": "Ausweis Vorderseite", "back": "Ausweis Rückseite", "uploadPhoto": "Foto hochladen"
  },
  "vehicle": {
    "sectionTitle": "Fahrzeuginformationen",
    "picture": "Fahrzeugbild", "uploadPhoto": "Foto hochladen",
    "type": "Fahrzeugtyp", "typePlaceholder": "Fahrzeugtyp",
    "typeMotorcycle": "Motorrad / Roller", "typeCar": "Auto", "typeBicycle": "Fahrrad",
    "plate": "Kennzeichen", "platePlaceholder": "12345678",
    "registration": "Zulassungsdokument",
    "uploadCta": "Zum Hochladen klicken", "uploadRest": " oder per Drag & Drop", "uploadHint": "PDF (max. 1 MB)"
  },
  "orders": {
    "sectionTitle": "Zugewiesene Bestellungen",
    "filters": { "all": "Alle anzeigen", "pending": "Ausstehend", "completed": "Abgeschlossen", "cancelled": "Storniert" },
    "searchPlaceholder": "Suchen", "filtersBtn": "Filter",
    "pickup": "Abholung", "pickedUp": "Abgeholt",
    "order": "Bestellung", "items": "{count} Artikel", "km": "{distance} km",
    "status": { "new": "Neu", "preparing": "In Zubereitung", "ready": "Bereit zur Abholung", "ontheway": "Unterwegs" }
  },
  "zone": {
    "sectionTitle": "Zugewiesene Zone & Restaurants",
    "zone": "Zugewiesene Zone", "restaurants": "Zugewiesene Restaurants"
  },
  "reviews": {
    "sectionTitle": "Bewertungen",
    "count": "({count} Bewertungen)"
  },
  "edit": {
    "navGroup": "Allgemein",
    "nav": {
      "personal": "Persönliche Informationen", "address": "Adressdaten", "id": "ID-Verifizierung",
      "vehicle": "Fahrzeuginformationen", "orders": "Zugewiesene Bestellungen",
      "zone": "Zugewiesene Zone & Restaurants", "reviews": "Bewertungen"
    },
    "cancel": "Abbrechen", "save": "Änderungen speichern"
  },
  "created": {
    "title": "Fahrer erfolgreich erstellt",
    "subtitle": "Ein Einladungslink wurde an {email} gesendet. Sie können den Link unten auch kopieren und manuell teilen.",
    "copy": "Kopieren", "returnToList": "Zur Fahrerliste zurückkehren", "createAnother": "+ Neuen Fahrer erstellen"
  },
  "saved": {
    "title": "Änderungen erfolgreich gespeichert",
    "subtitle": "Alle Änderungen wurden gespeichert und sind nun im System sichtbar.",
    "returnToList": "Zur Fahrerliste zurückkehren"
  },
  "delete": {
    "title": "Möchten Sie den Fahrer '{name}' wirklich löschen?",
    "subtitle": "Dieser Lieferfahrer kann nicht mehr auf das System zugreifen oder Bestellungen verfolgen. Alle Aktivitäten und der Verlauf bleiben gespeichert.",
    "confirm": "Fahrer löschen", "cancel": "Abbrechen"
  },
  "fail": { "title": "Hoppla! Etwas ist schiefgelaufen.", "subtitle": "Die Änderungen konnten nicht gespeichert werden! Bitte versuchen Sie es erneut.", "tryAgain": "Erneut versuchen", "back": "Zurück" },
  "empty": { "title": "Keine aktiven Lieferfahrer", "subtitle": "Senden Sie eine Einladung, um Benutzer zu Ihrem System hinzuzufügen." }
}
```

### German layout risk — Drivers v2 specific ⚠️
- `"+ Neuen Lieferfahrer hinzufügen"` (toolbar CTA) → much longer than English; ensure the button can grow / toolbar wraps on smaller widths.
- `"Verifizierung ausstehend"` (status pill) → longer than "Pending verification"; pill must hug content, allow no truncation.
- Edit left-rail labels (`"Zugewiesene Zone & Restaurants"`, `"Fahrzeuginformationen"`) → wider than English; left rail min-width must accommodate or labels wrap to 2 lines.
- `"Bereit zur Abholung"` / `"In Zubereitung"` (order pills) → keep pills auto-width.
- Stepper step labels (`"ID-Verifizierung"`, `"Fahrzeugdaten"`) → tight under the step circle; allow 2-line wrap.


---

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

### Section-nav modal pattern ← NEW (Edit Driver)
```tsx
// Two-pane modal: left rail of sections + right pane renders active section.
// Distinct from the wizard — sections are non-linear, each saves independently.
const [activeSection, setActiveSection] = useState<DriverEditSection>('personal')
// Left rail items map 1:1 to right-pane components; each section owns its Cancel/Save footer.
// Header shows the entity name + a StatusToggle (toggle-as-form-control pattern).
```

### Verification vs. activation pattern ← NEW
```tsx
// Two independent status concepts on the same entity — never merge them:
//   verification: 'verified' | 'pending'   → colored text pill in the Status column (display only)
//   status:       'active' | 'inactive' | 'archived'  → StatusToggle (activation control)
// A driver can be Verified + Inactive, or Pending + Active, etc.
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