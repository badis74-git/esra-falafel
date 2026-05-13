# Esra Falafel — Design System
> Stack: Next.js 16 + Tailwind CSS v4 (tokens via `@theme inline` in globals.css)
> Last updated: 2026-05-13 | Modules: Auth ✅ · Restaurant Managers ✅

---

## Module Coverage

| Module | Status | Route |
|---|---|---|
| Auth (Login, Forgot PW, OTP, Reset PW) | ✅ Done | `/login`, `/forgot-password`, `/verify-otp`, `/reset-password` |
| Restaurant Managers | ✅ Done | `/managers` |

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
| Stat Orange | `#F97316` | `stat-orange` | Total managers icon bg |
| Stat Orange BG | `#FFF7ED` | `stat-orange-bg` | Total managers card tint |
| Stat Green | `#16A34A` | `stat-green` | Active managers icon bg, trend up |
| Stat Green BG | `#F0FDF4` | `stat-green-bg` | Active managers card tint |
| Stat Yellow | `#EAB308` | `stat-yellow` | Inactive managers icon bg |
| Stat Yellow BG | `#FEFCE8` | `stat-yellow-bg` | Inactive managers card tint |
| Stat Red | `#DC2626` | `stat-red` | Archived managers icon bg, trend down, delete |
| Stat Red BG | `#FEF2F2` | `stat-red-bg` | Archived managers card tint |
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
| Manager form card padding | 24px | `p-6` |

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
| Manager grid card | 12px | `rounded-[12px]` |
| Content card | 12px | `rounded-[12px]` |
| Auth left panel right edge | 80px CSS | `border-radius: 0 80px 80px 0` |

---

## 5. Shadows

| Element | Value | Tailwind / custom |
|---|---|---|
| Input | `0 1px 2px rgba(0,0,0,0.05)` | `shadow-input` |
| Auth modal | `0 20px 60px rgba(0,0,0,0.15)` | `shadow-modal` |
| Stat / manager card | `0 1px 3px rgba(0,0,0,0.08)` | `shadow-card` |
| Dashboard modal | `0 20px 40px rgba(0,0,0,0.12)` | `shadow-dashboard-modal` |
| Topbar | bottom border only | `border-b border-table-border` |

---

## 6. Components

### `Input` ← Auth
**File:** `src/components/ui/Input.tsx`
Props: `label`, `leftIcon`, `rightIcon`, `error`, `placeholder`, `type`, `value`, `onChange`
States: default | focus (primary ring) | error (red border + bg + AlertCircle icon + helper text)

---

### `Button` ← Auth + Managers
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

### `LanguageSelector` ← Auth + Managers
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

### `StatusToggle` ← Managers
**File:** `src/components/managers/StatusToggle.tsx`
```tsx
{ checked, onChange, disabled?, size?: 'sm' | 'md' }
// checked → bg-primary green | unchecked → bg-neutral-300
// sm: w-8 h-4 | md (default): w-11 h-6
```

---

### `StatCard` ← Managers
**File:** `src/components/managers/StatCard.tsx`
```tsx
{ label, count, iconBgClass, icon, trend }
// White card, colored icon box, large count, StatBadge trend
```

---

### `StatBadge` ← Managers
**File:** `src/components/ui/StatBadge.tsx`
```tsx
{ value: number, label?: string }
// positive → ArrowUp + text-trend-up | negative → ArrowDown + text-trend-down
```

---

### `Avatar` ← Managers
**File:** `src/components/ui/Avatar.tsx`
```tsx
{ src?, name, size?: 'sm'|'md'|'lg', grayscale? }
// sm=32px md=48px lg=64px
// Fallback: first 2 initials, bg color deterministically hashed from name
// grayscale: CSS filter for archived state
```

---

### `FilterTabs` ← Managers
**File:** `src/components/managers/FilterTabs.tsx`
```tsx
{ active: TabValue, onChange, counts? }
// TabValue: 'all' | 'inactive' | 'active' | 'archived'
// Active: bg-primary text-white rounded-full | Inactive: white + neutral border
```

---

### `ViewToggle` ← Managers
**File:** `src/components/managers/ViewToggle.tsx`
```tsx
{ view: 'grid' | 'list', onChange }
// Active side: bg-primary text-white | Inactive: white + neutral border
// Grid icon + List icon from lucide-react
```

---

### `PhoneInput` ← Managers
**File:** `src/components/ui/PhoneInput.tsx`
```tsx
{ countryCode, dialCode, value, onChange, placeholder?, label? }
// Flag emoji + dial code + ChevronDown | vertical divider | tel input
// focus-within ring matches Input focus style
```

---

### `SelectDropdown` ← Managers
**File:** `src/components/ui/SelectDropdown.tsx`
```tsx
{ options, value, onChange, placeholder?, label?, required? }
// Native <select> styled same as Input, ChevronDown right (pointer-events-none)
```

---

### `SearchInput` ← Managers
**File:** `src/components/ui/SearchInput.tsx`
```tsx
{ ...InputHTMLAttributes, className? }
// Search icon left, neutral border, rounded-lg, focus ring primary
```

---

### `EmptyState` ← Managers
**File:** `src/components/managers/EmptyState.tsx`
Centered gray circle + person+list icon + green `+` badge.
Title: "No Active Restaurant Managers", subtitle: "Send an invitation to add users to your system."

---

### `Sidebar` ← Dashboard Layout
**File:** `src/components/layout/Sidebar.tsx`
```tsx
{ collapsed, onToggle }
// collapsed: w-[72px] icons only | expanded: w-[220px] icons + labels
// bg-primary green, active item bg-sidebar-active, hover bg-sidebar-hover
// Collapse toggle: small circle button on right edge
// 13 nav items using lucide-react icons
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

### `MapPreview` ← Managers
**File:** `src/components/managers/MapPreview.tsx`
OpenStreetMap iframe embed (Bern area). No API key required. `h-40`, `rounded-lg`, `border-neutral-300`.

---

### `CreateManagerModal` ← Managers
**File:** `src/components/managers/CreateManagerModal.tsx`
Full create form: StatusToggle in header, photo upload, Personal Info (2-col), Address (2-col + MapPreview), Assigned Restaurant dropdown.
"+ Create Manager" button disabled until firstName + lastName + email + restaurant filled.
On submit → `onCreated(email)` → triggers InvitationModal.

---

### `UpdateManagerModal` ← Managers
**File:** `src/components/managers/UpdateManagerModal.tsx`
Same structure as Create. Manager name shown in header instead of "Add New Manager".
Pre-fills all fields from `manager` prop. Footer: "Save Changes" → `onSaved()` → triggers SuccessModal.

---

### `InvitationModal` ← Managers
**File:** `src/components/managers/InvitationModal.tsx`
Post-create: shows email, invite link with Copy button, "Return To Managers List" + "Create New Manager".

---

### `SuccessModal` (managers) ← Managers
**File:** `src/components/managers/SuccessModal.tsx`
Green checkmark in circle. "Changes Saved Successfully." → "Return To Managers List".

---

### `FailModal` ← Managers
**File:** `src/components/managers/FailModal.tsx`
Orange broken doc + sad face. "Oops! Something went wrong." → "Try Again" + "Back".

---

### `DeleteManagerModal` ← Managers
**File:** `src/components/managers/DeleteManagerModal.tsx`
Red trash illustration. Dynamic manager name in title. "Delete Manager" uses `bg-danger` override on primary Button.

---

## 7. Patterns

### Form error handling pattern
Per-field `useState('')` errors. Validated on submit. Cleared on `onChange`. `<Input error={...}>` renders red border + bg + icon + helper text automatically.

### Auth page layout pattern
All auth pages under `src/app/(auth)/` use shared `(auth)/layout.tsx` → `<AuthLayout>`. Individual pages export only a form component — zero layout code.

### OTP countdown pattern
`secondsLeft` state (120s). `useEffect` with `setTimeout` decrements every second. Expired state shows red message and activates "Resend Code". Clicking Resend resets all state.

### Dashboard layout pattern
Dashboard pages use `<DashboardLayout title="...">` which internally manages sidebar collapse state. Sidebar uses `position: fixed` and main content has `marginLeft: sidebarWidth` + `padding-top: 64px` for topbar. Both animate with `transition-all duration-300` as sidebar collapses.

### Table row pattern
`ManagerTableRow` receives all callbacks as props (onEdit, onDelete, onToggleStatus). Archived rows apply `text-table-archived`, grayscale avatar, and disabled actions purely via CSS conditional classes — no separate component variant needed.

### Modal pattern
All dashboard modals: `fixed inset-0 z-50`, `backdrop-blur-sm bg-black/40` overlay, centered white card `rounded-[16px] shadow-dashboard-modal`. Close button top-right (`×`). Scrollable body via `overflow-y-auto` + `max-h-[90vh]`. Footer pinned with `flex-shrink-0 border-t`.

### Manager page state pattern
`managers/page.tsx` holds all state: `managers[]`, `view`, `activeTab`, `search`, `modal`. Modal state is a discriminated union `{ type: 'create' | 'update' | 'delete' | 'invite' | 'success' | 'fail', manager? }`. Filter is pure derived state (`.filter()` on render), no separate filtered state array.
