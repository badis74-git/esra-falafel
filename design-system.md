# Esra Falafel — Design System
> Stack: Next.js 16 + Tailwind CSS v4 (tokens via `@theme inline` in globals.css)
> Last updated: 2026-05-13 | Modules: Auth ✅ · Restaurant Managers ✅ · Delivery Drivers ✅

---

## Module Coverage

| Module | Status | Route |
|---|---|---|
| Auth (Login, Forgot PW, OTP, Reset PW) | ✅ Done | `/login`, `/forgot-password`, `/verify-otp`, `/reset-password` |
| Restaurant Managers | ✅ Done | `/managers` |
| Delivery Drivers | ✅ Done | `/drivers` |

---

## ⚠️ Refactor Instructions (run before building Delivery Drivers)

The following components were built under `/managers/` but are fully generic and must be
moved to `/ui/` before the Drivers module is built. After moving, update all import paths
in files that reference them.

### Step 1 — Move files

| From | To |
|---|---|
| `src/components/managers/StatusToggle.tsx` | `src/components/ui/StatusToggle.tsx` |
| `src/components/managers/StatCard.tsx` | `src/components/ui/StatCard.tsx` |
| `src/components/managers/FilterTabs.tsx` | `src/components/ui/FilterTabs.tsx` |
| `src/components/managers/ViewToggle.tsx` | `src/components/ui/ViewToggle.tsx` |
| `src/components/managers/EmptyState.tsx` | `src/components/ui/EmptyState.tsx` |
| `src/components/managers/MapPreview.tsx` | `src/components/ui/MapPreview.tsx` |

### Step 2 — Update imports in managers files

Update every import in the files below to point to the new `/ui/` paths:

- `src/components/managers/CreateManagerModal.tsx`
- `src/components/managers/UpdateManagerModal.tsx`
- `src/app/(dashboard)/managers/page.tsx`
- Any other file under `/managers/` that imports the moved components

### Step 3 — Verify

Run `pnpm dev` (or `npm run dev`) and confirm the Managers page still renders correctly
before starting any Drivers work.

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
| Stat Orange | `#F97316` | `stat-orange` | Total stat icon bg (managers + drivers) |
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
| Grid card (manager + driver) | 12px | `rounded-[12px]` |
| Content card | 12px | `rounded-[12px]` |
| Auth left panel right edge | 80px CSS | `border-radius: 0 80px 80px 0` |
| Map embed | 8px | `rounded-lg` |

---

## 5. Shadows

| Element | Value | Tailwind / custom |
|---|---|---|
| Input | `0 1px 2px rgba(0,0,0,0.05)` | `shadow-input` |
| Auth modal | `0 20px 60px rgba(0,0,0,0.15)` | `shadow-modal` |
| Stat / grid card | `0 1px 3px rgba(0,0,0,0.08)` | `shadow-card` |
| Dashboard modal | `0 20px 40px rgba(0,0,0,0.12)` | `shadow-dashboard-modal` |
| Topbar | bottom border only | `border-b border-table-border` |

---

## 6. Components

### Component File Map

```
src/components/
├── ui/                          ← shared across all modules
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
│   ├── StatusToggle.tsx         ← moved from /managers/
│   ├── StatCard.tsx             ← moved from /managers/
│   ├── FilterTabs.tsx           ← moved from /managers/
│   ├── ViewToggle.tsx           ← moved from /managers/
│   ├── EmptyState.tsx           ← moved from /managers/
│   └── MapPreview.tsx           ← moved from /managers/
├── auth/
│   ├── AuthLayout.tsx
│   ├── OtpInput.tsx
│   └── SuccessModal.tsx
├── layout/
│   ├── Sidebar.tsx
│   ├── Topbar.tsx
│   └── DashboardLayout.tsx
├── managers/
│   ├── CreateManagerModal.tsx
│   ├── UpdateManagerModal.tsx
│   ├── DeleteManagerModal.tsx
│   ├── InvitationModal.tsx
│   ├── SuccessModal.tsx
│   └── FailModal.tsx
└── drivers/
    ├── CreateDriverModal.tsx
    ├── UpdateDriverModal.tsx
    ├── DeleteDriverModal.tsx
    ├── InvitationModal.tsx
    ├── SuccessModal.tsx
    └── FailModal.tsx
```

---

### `Input` ← Auth
**File:** `src/components/ui/Input.tsx`
Props: `label`, `leftIcon`, `rightIcon`, `error`, `placeholder`, `type`, `value`, `onChange`
States: default | focus (primary ring) | error (red border + bg + AlertCircle icon + helper text)

---

### `Button` ← Auth + Managers + Drivers
**File:** `src/components/ui/Button.tsx`
Variants: `primary` | `secondary` | `ghost` | `google`
- **primary** — green bg, white text, hover darkens
- **secondary** — white bg, neutral border, dark text
- **ghost** — transparent bg, primary text
- **google** — white bg, neutral border, Google SVG
- For **danger** actions: pass `className="bg-danger hover:bg-red-700"` override on primary variant

---

### `Checkbox` ← Auth
**File:** `src/components/ui/Checkbox.tsx`
States: unchecked (white + neutral border) | checked (primary green fill + white checkmark)

---

### `OtpInput` ← Auth
**File:** `src/components/auth/OtpInput.tsx`
6 boxes, dash separator between index 2–3, auto-focus, backspace-back, paste distribution.

---

### `LanguageSelector` ← Auth + Dashboard
**File:** `src/components/ui/LanguageSelector.tsx`
Flag emoji + "English (UK)" + ChevronDown. Label hidden below `sm`.

---

### `BrandHeader` ← Auth
**File:** `src/components/ui/BrandHeader.tsx`
Circular logo + "Esra Falafel" bold text. Used at top of every auth form.

---

### `AuthLayout` ← Auth
**File:** `src/components/auth/AuthLayout.tsx`
Two-column split. Left panel: green gradient, 3 auto-cycling slides, curved right edge.
Right panel: white, LanguageSelector top-right, children centered in `max-w-[420px]`.

---

### `SuccessModal` (auth) ← Auth
**File:** `src/components/auth/SuccessModal.tsx`
Rocket illustration + title + subtitle + "Let's Go" → `/login`.

---

### `StatusToggle` ← Shared UI
**File:** `src/components/ui/StatusToggle.tsx`
```tsx
{ checked, onChange, disabled?, size?: 'sm' | 'md' }
// checked → bg-primary green | unchecked → bg-neutral-300
// sm: w-8 h-4 | md (default): w-11 h-6
```

---

### `StatCard` ← Shared UI
**File:** `src/components/ui/StatCard.tsx`
```tsx
{ label, count, iconBgClass, icon, trend }
// White card rounded-[12px] shadow-card p-4
// Colored icon box top-left, large count, StatBadge trend bottom-right
// Used by both Managers and Drivers pages with different label strings
```

---

### `StatBadge` ← Shared UI
**File:** `src/components/ui/StatBadge.tsx`
```tsx
{ value: number, label?: string }
// positive → ArrowUp + text-trend-up | negative → ArrowDown + text-trend-down
```

---

### `Avatar` ← Shared UI
**File:** `src/components/ui/Avatar.tsx`
```tsx
{ src?, name, size?: 'sm'|'md'|'lg', grayscale? }
// sm=32px md=48px lg=64px
// Fallback: first 2 initials, bg color deterministically hashed from name
// grayscale: CSS filter for archived state
```

---

### `FilterTabs` ← Shared UI
**File:** `src/components/ui/FilterTabs.tsx`
```tsx
{ active: TabValue, onChange, counts? }
// TabValue: 'all' | 'inactive' | 'active' | 'archived'
// Active: bg-primary text-white rounded-full | Inactive: white + neutral border
// Used identically by Managers and Drivers
```

---

### `ViewToggle` ← Shared UI
**File:** `src/components/ui/ViewToggle.tsx`
```tsx
{ view: 'grid' | 'list', onChange }
// Active side: bg-primary text-white | Inactive: white + neutral border
// Grid icon + List icon from lucide-react
```

---

### `PhoneInput` ← Shared UI
**File:** `src/components/ui/PhoneInput.tsx`
```tsx
{ countryCode, dialCode, value, onChange, placeholder?, label? }
// Flag emoji + dial code + ChevronDown | vertical divider | tel input
// focus-within ring matches Input focus style
```

---

### `SelectDropdown` ← Shared UI
**File:** `src/components/ui/SelectDropdown.tsx`
```tsx
{ options, value, onChange, placeholder?, label?, required? }
// Native <select> styled same as Input, ChevronDown right (pointer-events-none)
```

---

### `SearchInput` ← Shared UI
**File:** `src/components/ui/SearchInput.tsx`
```tsx
{ ...InputHTMLAttributes, className? }
// Search icon left, neutral border, rounded-lg, focus ring primary
```

---

### `EmptyState` ← Shared UI
**File:** `src/components/ui/EmptyState.tsx`
```tsx
{ title, subtitle, illustration? }
// Centered gray circle bg + person+list icon + green + badge
// title and subtitle are passed as props — component is not managers-specific
```

---

### `MapPreview` ← Shared UI
**File:** `src/components/ui/MapPreview.tsx`
OpenStreetMap iframe embed. No API key required.
```tsx
{ lat?, lng?, zoom? }
// h-40, rounded-lg, border border-neutral-300
// Defaults to Bern area if no coords passed
// Used in both CreateManagerModal and CreateDriverModal after Address Details section
```

---

### `ProfilePictureUpload` ← Shared UI  ← NEW
**File:** `src/components/ui/ProfilePictureUpload.tsx`
```tsx
{ src?, onChange, onDelete }
// Empty state: gray avatar circle + "Profile picture" label + "PNG, JPEG under 15MB"
//   + "Upload Picture" button (secondary, upload icon)
// Filled state: actual avatar circle + same label + "Delete" button (danger ghost, trash icon)
// Used in all Create and Update modals (managers + drivers)
```

---

### `Sidebar` ← Dashboard Layout
**File:** `src/components/layout/Sidebar.tsx`
```tsx
{ collapsed, onToggle }
// collapsed: w-[72px] icons only | expanded: w-[220px] icons + labels
// bg-primary green, active item bg-sidebar-active, hover bg-sidebar-hover
// Collapse toggle: small circle button on right edge
// Nav items (lucide-react icons):
//   Dashboard, Delivery Zones, Restaurants, Restaurant Managers,
//   Delivery Drivers (truck icon — active in this module),
//   Customers, Orders, Menu, Offers, Promotions, Review, Audit Logs, Settings
```

---

### `Topbar` ← Dashboard Layout
**File:** `src/components/layout/Topbar.tsx`
```tsx
{ breadcrumb?, title, sidebarWidth }
// Fixed top, right-to-sidebarWidth, h-16, white bg, border-b
// Left: breadcrumb (xs gray) + title (lg bold)
// Center: SearchInput (hidden on mobile)
// Right: LanguageSelector + Bell + Moon + Avatar
```

---

### `DashboardLayout` ← Dashboard Layout
**File:** `src/components/layout/DashboardLayout.tsx`
```tsx
{ children, title, breadcrumb? }
// Combines Sidebar + Topbar + page content
// Manages collapsed state, passes sidebarWidth to Topbar and main margin
// bg-page-bg background
```

---

### `CreateManagerModal` ← Managers
**File:** `src/components/managers/CreateManagerModal.tsx`
Sections: Profile (ProfilePictureUpload) | Personal Information (First Name, Last Name, Email, Phone) | Address Details (Street, N°, Zip, City, MapPreview) | Assigned Restaurant (SelectDropdown).
Header: "Add New Manager" + StatusToggle.
Footer: Cancel + "+ Create Manager" (disabled until firstName + lastName + email + restaurant filled).
On submit → `onCreated(email)` → triggers InvitationModal.

---

### `UpdateManagerModal` ← Managers
**File:** `src/components/managers/UpdateManagerModal.tsx`
Same structure as Create. Header shows manager name + StatusToggle. Pre-fills all fields.
Footer: Cancel + "Save Changes" → `onSaved()` → triggers SuccessModal.

---

### `InvitationModal` ← Managers
**File:** `src/components/managers/InvitationModal.tsx`
Post-create: person+list illustration, email, invite link + Copy button.
CTAs: "Return To Managers List" (primary) + "Create New Manager" (secondary).

---

### `SuccessModal` (managers) ← Managers
**File:** `src/components/managers/SuccessModal.tsx`
Green checkmark in circle. Title: "Changes Saved Successfully."
CTA: "Return To Managers List" (primary, full width).

---

### `FailModal` ← Managers
**File:** `src/components/managers/FailModal.tsx`
Orange broken doc + sad face. "Oops! Something went wrong."
CTAs: "Try Again" (primary green) + "Back" (secondary outlined).

---

### `DeleteManagerModal` ← Managers
**File:** `src/components/managers/DeleteManagerModal.tsx`
Red trash illustration. Title: "Are You Sure You Want To Delete Manager '{name}'?"
Subtitle: manager-specific access copy.
CTAs: "Delete Manager" (bg-danger override) + "Cancel" (secondary).

---

### `CreateDriverModal` ← Drivers  ← NEW
**File:** `src/components/drivers/CreateDriverModal.tsx`
Sections: Profile (ProfilePictureUpload) | Personal Information (First Name, Last Name, Email, Phone) | Address Details (Street, N°, Zip, City, MapPreview) | Assigned Zone & Restaurants (Assigned Zone dropdown, Assigned Restaurants dropdown).
Header: "Add New Driver" + StatusToggle.
Footer: Cancel + "+ Create Driver" (disabled until firstName + lastName + email + zone filled).
On submit → `onCreated(email)` → triggers InvitationModal.

---

### `UpdateDriverModal` ← Drivers  ← NEW
**File:** `src/components/drivers/UpdateDriverModal.tsx`
Sections: Profile (ProfilePictureUpload) | Personal Information (First Name, Last Name, Email, Phone) | Address Details (Street, N°, Zip, City, MapPreview) | Assigned Zone (Assigned Zone dropdown, Status dropdown).
Header: driver name + StatusToggle. Pre-fills all fields.
Footer: Cancel + "Save Changes" → `onSaved()` → triggers SuccessModal.
Note: Update has no Restaurants dropdown — only Zone + Status in the last section.

---

### `DeleteDriverModal` ← Drivers  ← NEW
**File:** `src/components/drivers/DeleteDriverModal.tsx`
Red trash illustration. Title: "Are You Sure You Want To Delete Driver '{name}'?"
Subtitle: "This delivery driver will no longer be able to access the system or track orders. All his activity and history will be saved."
CTAs: "Delete Driver" (bg-danger override) + "Cancel" (secondary).

---

### `InvitationModal` ← Drivers  ← NEW
**File:** `src/components/drivers/InvitationModal.tsx`
Post-create: person+list illustration, email, invite link + Copy button.
CTAs: "Return To Drivers List" (primary) + "Create New Driver" (secondary).

---

### `SuccessModal` (drivers) ← Drivers  ← NEW
**File:** `src/components/drivers/SuccessModal.tsx`
Green checkmark in circle.
- After create: title "Driver Created Successfully", subtitle invite copy, CTA "Return To Drivers List".
- After update: title "Changes Saved Successfully", subtitle "All edits have been saved and are now visible in the system.", CTA "Return To Drivers List".

---

### `FailModal` ← Drivers  ← NEW
**File:** `src/components/drivers/FailModal.tsx`
Identical visually to `managers/FailModal`. Can share the same illustration and layout.
CTAs: "Try Again" (primary green) + "Back" (secondary outlined).

---

## 7. Page — Delivery Drivers  ← NEW

**File:** `src/app/(dashboard)/drivers/page.tsx`

### Stat cards row
Four `StatCard` components using existing color tokens:
- Total Delivery Drivers → `stat-orange` / `stat-orange-bg`
- Active Delivery Drivers → `stat-green` / `stat-green-bg`
- Inactive Delivery Drivers → `stat-yellow` / `stat-yellow-bg`
- Archived Delivery Drivers → `stat-red` / `stat-red-bg`

### Toolbar
Left: `FilterTabs` (all / inactive / active / archived)
Right: `ViewToggle` + `SearchInput` + Filters button + Export button + Import button + "+ Add New Driver" primary button

### List view columns
`Full Name` (Avatar + name + email below) | `Phone` | `Role` (always "Delivery Driver") | `Assigned Zone` (can be multi e.g. "Zone A, Zone B") | `Join Date` | `Status` (StatusToggle) | `Actions` (edit icon + delete icon + kebab menu)

### Grid view card
White card `rounded-[12px] shadow-card p-6`. Avatar (centered, md size) + StatusToggle top-right.
Name (bold) + "Delivery Driver : {zones}" (neutral-500 small) + phone number (neutral-500 small).
Footer: "Delete" button (secondary, trash icon) + "Edit profile" button (primary, edit icon).
Archived card: grayscale avatar, muted text, disabled action buttons.

### Empty state
Uses `EmptyState` component with title "No Active Delivery Drivers" and subtitle "Send an invitation to add users to your system."

### Page state pattern
Same discriminated union modal state as managers page:
```tsx
// drivers/page.tsx
type ModalState =
  | { type: 'create' }
  | { type: 'update'; driver: Driver }
  | { type: 'delete'; driver: Driver }
  | { type: 'invite'; email: string; inviteLink: string }
  | { type: 'success'; variant: 'created' | 'updated' }
  | { type: 'fail' }
  | null
```

---

## 8. Patterns

### Form error handling pattern
Per-field `useState('')` errors. Validated on submit. Cleared on `onChange`. `<Input error={...}>` renders red border + bg + icon + helper text automatically.

### Auth page layout pattern
All auth pages under `src/app/(auth)/` use shared `(auth)/layout.tsx` → `<AuthLayout>`. Individual pages export only a form component — zero layout code.

### OTP countdown pattern
`secondsLeft` state (120s). `useEffect` with `setTimeout` decrements every second. Expired state shows red message and activates "Resend Code". Clicking Resend resets all state.

### Dashboard layout pattern
Dashboard pages use `<DashboardLayout title="...">` which internally manages sidebar collapse state. Sidebar uses `position: fixed` and main content has `marginLeft: sidebarWidth` + `padding-top: 64px` for topbar. Both animate with `transition-all duration-300` as sidebar collapses.

### Table row pattern
Row component receives all callbacks as props (onEdit, onDelete, onToggleStatus). Archived rows apply `text-table-archived`, grayscale avatar, and disabled actions purely via CSS conditional classes — no separate component variant needed.

### Modal pattern
All dashboard modals: `fixed inset-0 z-50`, `backdrop-blur-sm bg-black/40` overlay, centered white card `rounded-[16px] shadow-dashboard-modal`. Close button top-right (`×`). Scrollable body via `overflow-y-auto` + `max-h-[90vh]`. Footer pinned with `flex-shrink-0 border-t`.

### Modal form section pattern
```tsx
<div className="space-y-4">
  <h3 className="text-primary font-semibold text-sm">Section Title</h3>
  <div className="grid grid-cols-2 gap-4">
    <Input ... />
    <Input ... />
  </div>
</div>
```

### Disabled submit pattern
```tsx
const isValid = requiredFields.every(Boolean)
<Button disabled={!isValid} className={!isValid ? 'opacity-50 cursor-not-allowed' : ''}>
  + Create Driver
</Button>
```

### Archived row pattern
```tsx
<tr className={status === 'archived' ? 'opacity-60' : ''}>
  <Avatar grayscale={status === 'archived'} ... />
  // cells get text-table-archived class when archived
</tr>
```

### Page state pattern (managers + drivers)
`page.tsx` holds all state: `items[]`, `view`, `activeTab`, `search`, `modal`. Modal state is a discriminated union (see drivers pattern above). Filter is pure derived state (`.filter()` on render) — no separate filtered state array.

---

## Process — How to handle each new module

1. Share the screens with Claude
2. Claude analyzes: what is new vs already exists, any new tokens or components needed
3. Claude produces this document updated with:
   - Refactor instructions (if any components need to move to `/ui/`)
   - New tokens added to Section 1
   - New components added to Section 6 with file paths
   - New page spec added to Section 7
   - Module added to the coverage table
4. Hand both the updated `design-system.md` to Claude Code
5. Claude Code runs the refactor first, verifies, then builds the new module

> **Rule:** Always request the latest `design-system.md` from the project before starting
> a new module — Claude Code may have added or adjusted things since the last session.
