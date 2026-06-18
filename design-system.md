# Esra Falafel — Design System
> Stack: Next.js 16 + Tailwind CSS v4 (tokens via `@theme inline` in globals.css) · i18n: next-intl (en/de, cookie-based)
> Last updated: 2026-06-18 (Edit Menu v2 added) | Modules: Auth ✅ · Restaurant Managers ✅ · Delivery Drivers ✅ (v2 + mobile) · Zone Management ✅ · Restaurants ✅ · Menus Management 🔄 (Edit Menu v2) · Products ✅ · Categories ✅ · Sub-Categories ✅ · Add-on Groups ✅ · Add-ons ✅
> **All modules are bilingual (English + German).** See §8 Internationalization before building or editing any module.
> **All modules must be mobile-responsive.** See §5b Mobile / Responsive Rules before building any modal, stepper, or stat grid.
> **This is the CORE file.** Per-module detail (components, pages, i18n namespaces) is split into:
> `modules/drivers.md` · `modules/add-ons.md` · `modules/menus.md`. Load core + the relevant module file for each task.

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

## 5b. Mobile / Responsive Rules ⚠️ READ BEFORE BUILDING ANY MODAL, STEPPER, OR STAT GRID

> **Why this section exists:** the early modules (Auth, Restaurant Managers, Restaurants, Zones) are mobile-friendly. Several later modules (Delivery Drivers v2, Menu-Management family) were built desktop-first and break on phones: modals render as centered desktop popups that overflow, the 5-circle stepper clips, two-pane modals crush fields, and stat cards stack into a tall list. These rules are the contract that makes every module behave like the early ones. **Breakpoint: `md` (768px) is the divide.** Below `md` = mobile; `md:` and up = desktop.

> **Golden rule:** the early modules are the reference implementation. When building/fixing responsive behavior, read the equivalent early-module component (e.g. `managers/` modal, `restaurants/` stepper) and mirror its approach — do not invent a new pattern.

### R1 — Modals: full-screen sheet on mobile, centered dialog on desktop
Every dashboard modal (create, edit, confirm, success, fail — all modules) uses ONE responsive shell:
- **Mobile (`< md`):** full-screen sheet. `fixed inset-0`, width/height 100%, **no centering, no max-width, no rounded corners** (or only top corners if it slides up). Header sticky top, footer sticky bottom, body scrolls between them (`overflow-y-auto`, `flex-1`). The modal owns the whole viewport.
- **Desktop (`md:`):** the existing centered card — `md:inset-auto md:max-w-2xl md:rounded-[16px] md:max-h-[90vh] md:shadow-dashboard-modal`, backdrop `bg-black/40 backdrop-blur-sm`.
- One component, responsive classes — never a separate mobile modal. Small confirm/success/fail modals MAY stay centered on mobile if they already fit (they're short); the full-screen rule is mandatory for any modal with a form or scrolling content.

```tsx
// Modal shell — responsive
<div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:flex md:items-center md:justify-center">
  <div className="flex h-full w-full flex-col bg-white
                  md:h-auto md:max-h-[90vh] md:w-full md:max-w-2xl md:rounded-[16px] md:shadow-dashboard-modal">
    <header className="flex-shrink-0 border-b ...">…title + close…</header>
    <div className="flex-1 overflow-y-auto p-6">…body…</div>
    <footer className="flex-shrink-0 border-t p-4">…actions…</footer>
  </div>
</div>
```

### R2 — Stat / KPI cards: responsive grid, never a single-column list
The 4 stat cards use a responsive grid in EVERY module (this is how the early modules do it). Never let them collapse into 4 stacked full-width blocks.
- **Mobile (`< md`):** `grid-cols-2` (2×2).
- **Desktop (`md:`):** `md:grid-cols-4`.
```tsx
<div className="grid grid-cols-2 gap-4 md:grid-cols-4">…4× StatCard…</div>
```

### R3 — Stepper: full circle-stepper on desktop, compact "Step X of N" on mobile
The 5-circle `StepperHeader` does not fit phone width (circles clip, labels wrap/disappear). `StepperHeader` must render two ways off the same props:
- **Desktop (`md:`):** the existing green gradient bar with all N numbered circles + labels + connectors. Unchanged.
- **Mobile (`< md`):** a compact header inside the same green bar — one line: **"Step {current} of {total}"** (small, white/translucent) + the **current step's label** (e.g. "Address Details", white, font-semibold) + a thin **progress bar** beneath it filling `current/total`. No circles, no connectors on mobile.
- Implement as `hidden md:flex` on the circles row and `flex md:hidden` on the compact row — same component, same `currentStep`/`steps` props.

### R4 — Section-nav (two-pane) modals: side-by-side on desktop, drill-in on mobile
Applies to `EditDriverModal` and any future two-pane (left rail + content) modal.
- **Desktop (`md:`):** left rail + right content pane side by side (existing layout).
- **Mobile (`< md`):** drill-in. Open shows the **section list only** (full-width menu — the rail items as a vertical list). Tapping a section navigates to that section full-width with a **back arrow** in the section header returning to the list. Only one pane visible at a time.
- State: add `mobileView: 'list' | 'section'` alongside `activeSection`. On desktop `mobileView` is ignored (both panes always shown). Selecting a section on mobile sets `mobileView='section'`; the back arrow sets it to `'list'`.
```tsx
// EditDriverModal — responsive two-pane → drill-in
const [activeSection, setActiveSection] = useState<DriverEditSection>('personal')
const [mobileView, setMobileView] = useState<'list'|'section'>('list')
// Desktop: rail (md:block) + pane (md:block) always visible.
// Mobile: show rail when mobileView==='list', else show pane with a ← back header.
```

### R5 — General responsive hygiene (all modules)
- Multi-column form grids collapse on mobile: `grid-cols-1 md:grid-cols-2`. Never keep 2 columns below `md` (it crushes inputs — see the squeezed First/Last name boxes bug).
- Toolbars (ViewToggle + Search + Filters + Export/Import + primary CTA) wrap on mobile: `flex-wrap gap-2`, or stack the primary CTA full-width below the controls.
- Long section titles / step labels: allow wrap, never fixed-width that clips.
- Tap targets ≥ 40px high on mobile.
- Test every new module at 375px before considering it done.

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
│   ├── StepperHeader.tsx              ← RESPONSIVE: circles on desktop, "Step X of N" + progress bar on mobile (§5b R3)
│   ├── TimeInput.tsx
│   ├── PdfUploadZone.tsx
│   ├── DateInput.tsx                  ← NEW (DD-MM-YYYY picker, used in driver forms)
│   ├── PhotoUploadBox.tsx             ← NEW (dashed "Upload photo" tile — ID front/back, vehicle)
│   ├── FileAttachmentRow.tsx          ← NEW (PDF row: icon + name + date·size + view/download/delete)
│   ├── OrderStatusPill.tsx            ← NEW (New / Preparing / Ready for pick up / On the Way)
│   ├── SelectableCategoryRow.tsx      ← NEW (grid + list variants; checkbox category row — Edit Menu Categories)
│   ├── SelectableProductRow.tsx       ← NEW (grid + list variants; checkbox product row — Edit Menu Products)
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

---

## 6b. Module component specs → see module files

Detailed component specs live in per-module files (load alongside this core file):
- **Delivery Drivers** → `modules/drivers.md`
- **Add-ons** → `modules/add-ons.md`
- **Menus / Products / Categories / Sub-Categories / Add-on Groups** → `modules/menus.md`

---

## 7. Pages

Page specs live in their module files:
- Delivery Drivers page → `modules/drivers.md`
- Add-ons Management page → `modules/add-ons.md`
- Menus family pages → `modules/menus.md`

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

### Module i18n namespaces → see module files
Each module's `en`/`de` namespace lives with its spec:
- `drivers` namespace → `modules/drivers.md`
- `addOns` namespace → `modules/add-ons.md`
- Other namespaces (`managers`, `zones`, `restaurants`, `menus`, `products`, `categories`, `subCategories`, `addOnGroups`) → already in `messages/en.json` + `messages/de.json`; extract to module files as each is revisited.

---

## 9. Patterns

### Dashboard layout pattern
`<DashboardLayout title="...">` manages sidebar collapse. Sidebar fixed, main `marginLeft: sidebarWidth` + `padding-top: 64px`. `transition-all duration-300`.

### Modal pattern
**Responsive — see §5b R1 (mandatory).** Mobile (`< md`): full-screen sheet (`fixed inset-0`, full width/height, sticky header + footer, scrolling body, no centering/max-width/radius). Desktop (`md:`): centered white card `md:max-w-2xl md:rounded-[16px] md:max-h-[90vh] md:shadow-dashboard-modal`, backdrop `bg-black/40 backdrop-blur-sm`. One responsive component, never a separate mobile modal. Close button top-right; footer `flex-shrink-0 border-t`.

### Multi-step wizard pattern
**Stepper is responsive — see §5b R3:** full circle-stepper on desktop, compact "Step X of N" + label + progress bar on mobile.
```tsx
const [step, setStep] = useState(1)
const [formData, setFormData] = useState<MenuFormData>({...})
const updateForm = (patch: Partial<MenuFormData>) =>
  setFormData(prev => ({ ...prev, ...patch }))
```

### Section-nav modal pattern (Edit Driver)
**Responsive — see §5b R4 (mandatory).** Desktop: left rail of sections + right pane side by side. Mobile (`< md`): drill-in — section list only, tap → full-width section with a ← back header. Distinct from the wizard — sections are non-linear, each saves independently.
```tsx
const [activeSection, setActiveSection] = useState<DriverEditSection>('personal')
const [mobileView, setMobileView] = useState<'list'|'section'>('list')  // ignored on desktop (both panes shown)
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