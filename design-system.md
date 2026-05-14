# Esra Falafel — Design System
> Stack: Next.js 16 + Tailwind CSS v4 (tokens via `@theme inline` in globals.css)
> Last updated: 2026-05-14 | Modules: Auth ✅ · Restaurant Managers ✅ · Delivery Drivers ✅ · Zone Management ✅

---

## Module Coverage

| Module | Status | Route |
|---|---|---|
| Auth (Login, Forgot PW, OTP, Reset PW) | ✅ Done | `/login`, `/forgot-password`, `/verify-otp`, `/reset-password` |
| Restaurant Managers | ✅ Done | `/managers` |
| Delivery Drivers | ✅ Done | `/drivers` |
| Zone Management | ✅ Done | `/zones` |

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
| Grid card (all modules) | 12px | `rounded-[12px]` |
| Content card | 12px | `rounded-[12px]` |
| Auth left panel right edge | 80px CSS | `border-radius: 0 80px 80px 0` |
| Map embed / editor | 8px | `rounded-lg` |

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
├── ui/                              ← shared across all modules
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
│   ├── MultiSelectDropdown.tsx      ← NEW
│   └── ZoneMapEditor.tsx            ← NEW
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
├── drivers/
│   ├── CreateDriverModal.tsx
│   ├── UpdateDriverModal.tsx
│   ├── DeleteDriverModal.tsx
│   ├── InvitationModal.tsx
│   ├── SuccessModal.tsx
│   └── FailModal.tsx
└── zones/
    ├── ZoneGridCard.tsx              ← NEW
    ├── CreateZoneModal.tsx           ← NEW
    ├── UpdateZoneModal.tsx           ← NEW
    ├── DeleteZoneModal.tsx           ← NEW
    ├── SuccessModal.tsx              ← NEW
    └── FailModal.tsx                 ← NEW
```

---

### `StatusToggle` ← Shared UI
**File:** `src/components/ui/StatusToggle.tsx`
```tsx
{ checked, onChange, disabled?, size?: 'sm' | 'md' }
// checked → bg-primary | unchecked → bg-neutral-300
// sm: w-8 h-4 | md (default): w-11 h-6
```

---

### `StatCard` ← Shared UI
**File:** `src/components/ui/StatCard.tsx`
```tsx
{ label, count, iconBgClass, icon, trend }
// White card rounded-[12px] shadow-card p-4
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
```

---

### `FilterTabs` ← Shared UI
**File:** `src/components/ui/FilterTabs.tsx`
```tsx
{ active: 'all'|'inactive'|'active'|'archived', onChange, counts? }
```

---

### `ViewToggle` ← Shared UI
**File:** `src/components/ui/ViewToggle.tsx`
```tsx
{ view: 'grid' | 'list', onChange }
```

---

### `SelectDropdown` ← Shared UI
**File:** `src/components/ui/SelectDropdown.tsx`
```tsx
{ options, value, onChange, placeholder?, label?, required? }
```

---

### `MultiSelectDropdown` ← Shared UI ← NEW
**File:** `src/components/ui/MultiSelectDropdown.tsx`
```tsx
{ options: { label: string; value: string; avatar?: string }[]
  value: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  label?: string
}
// Closed: selected items joined by " - " or placeholder + ChevronDown
// Open: dropdown list, each row has Checkbox + optional Avatar + label
// Selected row: bg-primary-light + primary Checkbox + green checkmark right
// Unselected row: white + empty Checkbox
// Styled same as Input — rounded-lg border-neutral-300 focus ring primary
// Used for Assigned Restaurants (no avatar) and Assigned Drivers (with avatar)
```

---

### `EmptyState` ← Shared UI
**File:** `src/components/ui/EmptyState.tsx`
```tsx
{ title, subtitle, illustration?: 'person' | 'location' }
// 'person' (default): person+list icon — used by managers + drivers
// 'location': location-pin icon — used by zones
```

---

### `MapPreview` ← Shared UI
**File:** `src/components/ui/MapPreview.tsx`
Static OpenStreetMap iframe. `h-40 rounded-lg`. Used in driver modals.

---

### `ZoneMapEditor` ← Shared UI ← NEW
**File:** `src/components/ui/ZoneMapEditor.tsx`
```tsx
{ polygon?: LatLng[], onChange?: (polygon: LatLng[]) => void, readOnly?: boolean }
// Interactive Leaflet map with leaflet-draw
// Left toolbar (4 buttons): Select · Edit polygon · Delete · Layers
// Zoom: + / − bottom-left
// Draw mode: click to place polygon vertices, yellow stroke
// Assigned restaurants shown as logo markers inside drawn polygon
// h-72 rounded-lg full width
// MUST use next/dynamic with ssr: false — Leaflet requires browser environment
// Install: npm install leaflet leaflet-draw @types/leaflet @types/leaflet-draw
```

---

### `ProfilePictureUpload` ← Shared UI
**File:** `src/components/ui/ProfilePictureUpload.tsx`
```tsx
{ src?, onChange, onDelete }
```

---

### `ZoneGridCard` ← Zones ← NEW
**File:** `src/components/zones/ZoneGridCard.tsx`
```tsx
{ zone: Zone }
// White card rounded-[12px] shadow-card
// Header row: zone name (bold) + StatusToggle top-right
// Body: MapPreview full width h-40
// Stats row (4 cols, centered, pt-3 border-t mt-3):
//   count bold / label small neutral-500
//   Restaurants | Drivers | Customers | Orders
// Footer (border-t mt-3 pt-3): Delete (secondary) + Edit Zone (primary, edit icon)
// Archived: opacity-60, muted text, disabled buttons
```

---

### `CreateZoneModal` ← Zones ← NEW
**File:** `src/components/zones/CreateZoneModal.tsx`
```tsx
{ isOpen, onClose, onCreated }
// Header: "Add New Zone" + StatusToggle
// Sections:
//   Zone Details:
//     Zone Name* — Input full width
//     Zone Description — textarea full width (no Input component, native textarea styled same)
//   Zone Map:
//     ZoneMapEditor (dynamic import, h-72)
//   2-column row below map:
//     Assigned Restaurant — MultiSelectDropdown
//     Assigned Drivers — MultiSelectDropdown (with avatars)
// Footer: Cancel + "+ Create Zone" (disabled until zoneName filled)
// On submit → onCreated() → triggers SuccessModal variant 'created'
```

---

### `UpdateZoneModal` ← Zones ← NEW
**File:** `src/components/zones/UpdateZoneModal.tsx`
```tsx
{ isOpen, zone, onClose, onSaved }
// Identical structure to CreateZoneModal
// Header: zone.name + StatusToggle (pre-filled toggle state)
// All fields pre-filled from zone prop
// Footer: Cancel + "Save Changes"
// On submit → onSaved() → triggers SuccessModal variant 'updated'
```

---

### `DeleteZoneModal` ← Zones ← NEW
**File:** `src/components/zones/DeleteZoneModal.tsx`
```tsx
{ isOpen, zone, onClose, onConfirm }
// Red trash illustration (same as managers + drivers)
// Title: "Are You Sure You Want To Delete Zone '{zone.name}' ?"
// Subtitle: "This action is permanent and cannot be undone. Deleting this zone
//   will remove all associated configurations and assignments."
// CTAs: "Delete Zone" (bg-danger) + "Cancel" (secondary)
```

---

### `SuccessModal` (zones) ← Zones ← NEW
**File:** `src/components/zones/SuccessModal.tsx`
```tsx
{ variant: 'created' | 'updated', onGoToList, onCreateAnother? }
// variant 'created':
//   Green checkmark illustration
//   Title: "Zone Created Successfully!"
//   Subtitle: "The zone has been created successfully. You can now assign
//     restaurants, configure coverage, and manage operations within this zone."
//   CTAs: "Go To Zones List" (primary full width) + "+ Create Another Zone" (secondary full width)
// variant 'updated':
//   Green checkmark illustration
//   Title: "Changes Saved Successfully"
//   Subtitle: "All edits have been saved and are now visible in the system."
//   CTA: "Return To Zones List" (primary full width, single button)
```

---

### `FailModal` ← Zones ← NEW
**File:** `src/components/zones/FailModal.tsx`
Identical to managers/FailModal. "Oops! Something went wrong." + "Try Again" + "Back".

---

## 7. Pages

### Page — Zone Management ← NEW
**File:** `src/app/(dashboard)/zones/page.tsx`

**Stat cards:**
- Total Zones → `stat-orange` / `stat-orange-bg` — MapPin icon
- Active Zones → `stat-green` / `stat-green-bg` — MapPin icon
- Inactive Zones → `stat-yellow` / `stat-yellow-bg` — MapPin icon
- Archived Zones → `stat-red` / `stat-red-bg` — MapPin icon

**Toolbar:**
Left: `FilterTabs` (all / active / inactive / archived)
Right: `ViewToggle` + `SearchInput` + Filters button + Export button + Import button + "+ Add New Zone" primary button

**Grid view:** 3-column grid of `ZoneGridCard`

**List view columns:**
Zone Name | Restaurants | Delivery Drivers | Customers | Orders | Creation Date | Description | Status (StatusToggle) | Actions (edit + delete + kebab)

**Empty state:** `EmptyState` with `illustration="location"`, title "No Zones Created Yet", subtitle "Start creating your first zone."

**Page state:**
```tsx
type ModalState =
  | { type: 'create' }
  | { type: 'update'; zone: Zone }
  | { type: 'delete'; zone: Zone }
  | { type: 'success'; variant: 'created' | 'updated' }
  | { type: 'fail' }
  | null
```

**Mock data:**
```ts
// src/lib/mock/zones.ts
export const mockZones = [
  {
    id: '1', name: 'Zone A',
    description: 'Zone A contains two stores : Esra Falafel 1 and Esra Falafel 2.',
    restaurants: 2, drivers: 4, customers: 235, orders: 270,
    assignedRestaurants: ['Esra Falafel 1', 'Esra Falafel 2'],
    assignedDrivers: ['Orlando Diggs'],
    creationDate: '11/02/2026', status: 'active', polygon: null,
  },
  {
    id: '2', name: 'Zone B',
    description: 'Lorem Ipsum is simply dummy',
    restaurants: 1, drivers: 2, customers: 130, orders: 210,
    assignedRestaurants: ['Esra Falafel 1'],
    assignedDrivers: ['Drew Cano', 'Natali Craig'],
    creationDate: '11/02/2026', status: 'active', polygon: null,
  },
  {
    id: '3', name: 'Zone C',
    description: 'Lorem Ipsum is simply dummy',
    restaurants: 1, drivers: 1, customers: 0, orders: 0,
    assignedRestaurants: ['Esra Falafel 3'],
    assignedDrivers: ['Luca Muller'],
    creationDate: '10/02/2026', status: 'inactive', polygon: null,
  },
]
```

---

## 8. Patterns

### Dashboard layout pattern
`<DashboardLayout title="...">` manages sidebar collapse. Sidebar fixed, main `marginLeft: sidebarWidth` + `padding-top: 64px`. `transition-all duration-300`.

### Modal pattern
`fixed inset-0 z-50`, `backdrop-blur-sm bg-black/40`, centered white card `rounded-[16px] shadow-dashboard-modal`. Close button top-right. `overflow-y-auto max-h-[90vh]`. Footer `flex-shrink-0 border-t`.

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

### Archived row pattern
```tsx
<tr className={status === 'archived' ? 'opacity-60' : ''}>
  <Avatar grayscale={status === 'archived'} ... />
```

### Page state pattern
Discriminated union modal state. Filter as pure derived `.filter()` on render.

### Leaflet SSR pattern ← NEW
```tsx
// ZoneMapEditor MUST use next/dynamic to avoid SSR window errors
const ZoneMapEditor = dynamic(
  () => import('@/components/ui/ZoneMapEditor'),
  { ssr: false }
)
```

---

## Process — How to handle each new module

1. Share screens + latest `design-system.md` with Claude
2. Claude analyzes what's new vs already exists
3. Claude produces updated `design-system.md` + Claude Code prompt
4. Update the file in the project, then hand Claude Code prompt
5. Claude Code builds — no guessing, no duplication

> **Rule:** Always share the latest `design-system.md` from the project at the start of each module session.
