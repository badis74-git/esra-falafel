# Esra Falafel — Module: Restaurants Management

> Load with `design-system.md` (core). Covers the Restaurants Management page + Edit Restaurant modal.
> i18n namespace `restaurants` lives in `messages/*.json`.

---

### Page — Restaurants Management
*(unchanged — stat cards: Total / Active / Inactive / Archived; Restaurants List with Grid/List, Search, Filters, Export, Import, + Add New Restaurant; restaurant card/row → Edit opens `EditRestaurantModal`.)*

### Add / Create Restaurant — wizard
*(unchanged — stays a multi-step wizard with StepperHeader + Cancel/Save Changes, exactly like Create Driver / Create Menu. Only **Edit** Restaurant is redesigned below.)*

---

## Edit Restaurant — v2 (REDESIGNED: wizard → section-nav modal)

> **What changed:** the old Edit Restaurant was a multi-step **wizard** (steps + Cancel / Save Changes, like Create Restaurant). v2 replaces it with a **section-nav modal** — the SAME pattern as `EditDriverModal` and `EditMenuModal` (core §9 Section-nav modal pattern + §5b R1 + R4). **Create / Add Restaurant stays a wizard** (unchanged); only Edit Restaurant is redesigned. Build `EditRestaurantModal` by mirroring `EditDriverModal` — reuse its shell, header, rail, footer, and responsive (desktop two-pane / mobile drill-in) behavior. Do not rebuild the shell from scratch.

### `EditRestaurantModal` ← Restaurants ← NEW (left-rail section modal)
**File:** `src/components/restaurants/EditRestaurantModal.tsx`
```tsx
{ isOpen, restaurant: Restaurant, onClose, onSaved: () => void, onToggleStatus }
// Shell = identical to EditDriverModal (core §5b R1 + R4):
//   Mobile: full-screen sheet + drill-in (section list -> tap -> section + back arrow).
//   Desktop: centered card (max-w-5xl), two-pane (left rail + right white inner card).
// HEADER (no stepper): restaurant name "Esra Falafel 3" (Modal Title named, bold) + StatusToggle inline + ✕ close.
// LEFT RAIL — "General" group label, 9 nav items (icon tile + label):
//   👤 Restaurant Information   (default active)
//   📍 Location
//   💼 Operations
//   👥 Team
//   📋 Menu
//   🛍 Orders
//   ⭐ Reviews
//   📇 Support Contact
//   🌐 Online Presence
//   Active item: white rounded pill, label neutral-900 bold, icon tile = SOLID green (primary) square, white glyph.
//   Inactive item: label neutral-700, icon tile = SOLID green (primary) square with white glyph (NOT a pale/outline
//     icon, NOT a faint tint). Every rail item — active or not — has the solid green icon tile; only the pill +
//     label weight change between states. (Matches the target screenshots exactly; do not restyle the icons.)
//   RIGHT PANE — white inner card rounded-[12px], renders the active sections/*.tsx.
// Each section has its OWN footer: [Cancel] (secondary) + [💾 Save Changes] (primary) — full-width flex on mobile (§5b R5).
//   Save → onSaved() → ChangesSavedModal (REUSE shared/drivers). Failure → FailModal (REUSE).
// const [activeSection, setActiveSection] = useState<RestaurantEditSection>('info')
// const [mobileView, setMobileView] = useState<'list'|'section'>('list')   // §5b R4
```

#### `sections/RestaurantInfoSection` ← NEW  (image: Restaurant information)
```tsx
// Title "Restaurant Information" (green Section Title).
// Top row: restaurant picture (round thumbnail) + "Restaurant picture / PNG, JPEG under 15MB" + [🗑 Delete] (text-danger).
//   REUSE ProfilePictureUpload.
// Divider, then fields:
//   Restaurant Name * (Input, storefront icon, full width)
//   Grid 2-col (→ 1-col mobile §5b R5): Email * (Input, mail icon) | Phone Number * (PhoneInput, DE +49)
//   Assigned Manager (SelectDropdown with avatar + name, e.g. "Orlando Diggs")
//   Restaurant Description (textarea, full width, placeholder "Enter description")
// Footer: Cancel + Save Changes.
```

#### `sections/LocationSection` ← NEW  (image: Location)
```tsx
// Title "Location" (green).
// Grid 2-col (→ 1-col mobile): Street (Input) | N° (Input) ; Zip (Input) | City (Input).
// <MapPreview> below (REUSE) — map with restaurant marker pin.
// Footer: Cancel + Save Changes.
```

#### `sections/OperationsSection` ← NEW  (image: Operations)
```tsx
// Title "Operations" (green).
// Active Menu (SelectDropdown, "Our Menu").
// Row of two toggles: "Enable Delivery" (StatusToggle) + "Enable Cash On Delivery" (StatusToggle).
// Divider. Sub-title "Opening Days & Hours" (green Section Title).
// Repeatable hours rows (array): each row = Working Days (MultiSelectDropdown of weekdays,
//   e.g. "Monday, Tuesday, Wednesday, Thur…") | From (TimeInput) | To (TimeInput) + [🗑 Delete] (text-danger, right).
//   "+ Add More" button adds a row (secondary). Last row shows Add More + Delete together.
// Grid: on desktop Working Days | From | To in a 3-col-ish row; collapse to stacked on mobile (§5b R5).
// Footer: Cancel + Save Changes.
// State: hours: { days: string[]; from: string; to: string }[]
```

#### `sections/TeamSection` ← NEW  (image: Team)
```tsx
{ manager: TeamMember, drivers: TeamMember[] }
// Title "Team" (green).
// Toolbar: SearchInput + ViewToggle (Grid/List) right (REUSE; wrap on mobile §5b R5).
// Sub-group "Manager" (green Section Title) → 1 TeamMemberCard.
// Divider. Sub-group "Delivery Drivers" (green) → N TeamMemberCards.
// Footer: Cancel + Save Changes.
```

##### `TeamMemberCard` ← Shared UI ← NEW
**File:** `src/components/ui/TeamMemberCard.tsx`
```tsx
{ member: { id, name, avatar, roleLine, phone }, active: boolean, onToggle, onEdit, onDelete }
// Light-green tinted card (primary-light bg, rounded-[12px]).
// Left: Avatar + name (bold) + StatusToggle inline next to name.
//   roleLine below ("Restaurant Manager : Esra Falafel 1" / "Delivery Driver : Zone A, Zone B")
//   phone below ("+49 72 542 00 20").
// Right (stacked): [✏ Edit] (primary, filled green) over [🗑 Delete] (secondary/outline).
// Mobile: actions wrap below the identity block (§5b R5).
```

#### `sections/MenuSection` ← NEW  (image: Menu)
```tsx
// Title "Menu" (green).
// Active Menu (SelectDropdown, "Our Menu").
// MenuPreviewCard below: rounded-[12px] border —
//   banner image (menu cover) on top;
//   row: menu name "Our Menu" (bold) + "Last Updated: 03/01/2026" (neutral-500) on left,
//        right two stacked metrics: "25 Products" + "7 Categories".
// Footer: Cancel + Save Changes.
```

#### `sections/OrdersSection` ← NEW  (image: Orders) — READ-ONLY display, Save is layout-only
```tsx
{ orders: RestaurantOrder[] }
// Title "Orders" (green).
// Toolbar: ViewToggle (Grid/List) + SearchInput + Filters button (REUSE; wrap on mobile).
// FilterTabs with counts (REUSE FilterTabs): All (103) · New (3) · Preparing (6) · Ready (2) ·
//   Picked-up (4) · Delivered (85) · Cancelled (2).
// Order card (vertical list, each rounded-[12px] border):
//   HEADER STRIP (tinted by status): left = OrderStatusPill (New / Preparing / On the way / Ready / Cancelled);
//     right = driver name with bike glyph ("Luca Muller") or "No Driver Assigned" (neutral-500) when none.
//   BODY:
//     "Order #34432" (Order Number) + time right ("12:30 PM") [neutral-500]
//     👤 customer name ("Emma Schneider")
//     📍 address ("Reichenberger Straße 42, 10999 Berlin")  (Order Meta)
//     bottom row (3 cells, divided): 💳/💵 payment + amount ("Cash (€32.00)" / "Credit Card (€22.50)")
//       · 🛍 "N items" · 📍 "X.XKm"
// Pagination row (REUSE): ← Previous · 1 2 3 … 8 9 10 · Next →.
// Footer: Cancel + Save Changes (layout-only — Orders are read-only; no edit persistence).
// NOTE: extend OrderStatusPill statuses to include 'ontheway' (purple "On the way") + 'cancelled' (red)
//   if not already present. Reuse existing pill component; add the two variants.
```

#### `sections/ReviewsSection` ← NEW  (image: Reviews) — REUSE driver ReviewsSection exactly
```tsx
{ rating: number, reviews: Review[] }
// Title "Review" (green).
// Same layout as drivers/sections/ReviewsSection — DO NOT rebuild; reuse the same structure/components:
//   Summary: big "4.5" (Rating Big) + RatingStars(value, half-star) under it + "(4 Reviews)" (neutral-500) left;
//            RatingBarChart on the right (5→1 distribution).
//   Review list: each = Avatar + name (Review Name) + RatingStars(small) + timestamp right (Review Time)
//     + quoted comment (Review Body, italic) + optional attached photo thumbnails row.
// Reviews are read-only display; Cancel + Save Changes present for layout consistency.
// REUSE RatingStars + RatingBarChart (shared). The driver review item supports photo thumbnails already; reuse it.
```

#### `sections/SupportContactSection` ← NEW  (image: support contact)
```tsx
// Title "Support Contact" (green).
// Grid 2-col (→ 1-col mobile): Phone Number * (PhoneInput, DE +49) | Whatsapp Number (PhoneInput, DE +49) ;
//   Website Link (Input, globe icon) | Email * (Input, mail icon).
// Footer: Cancel + Save Changes.
```

#### `sections/OnlinePresenceSection` ← NEW  (image: Online Presence)
```tsx
// Title "Online Presence" (green).
// Grid 2-col (→ 1-col mobile): Website Link (Input, globe icon) | Facebook Link (Input) ;
//   Instagram Link (Input) | TikTok Link (Input).
// Footer: Cancel + Save Changes.
```

---

### Restaurant edit data shapes (`src/lib/mock/restaurants.ts`)
```ts
interface Restaurant {
  id: string; name: string; picture?: string
  status: 'active' | 'inactive' | 'archived'
  // Restaurant Information
  email: string; phone: string; managerId?: string; description?: string
  // Location
  address: { street: string; number: string; zip: string; city: string }
  // Operations
  activeMenuId?: string
  enableDelivery: boolean; enableCashOnDelivery: boolean
  hours: { days: string[]; from: string; to: string }[]   // "09:00".."23:00"
  // Team
  manager?: TeamMember; drivers: TeamMember[]
  // Menu (display)
  menu?: { name: string; cover?: string; lastUpdated: string; products: number; categories: number }
  // Orders (read-only display)
  orders: RestaurantOrder[]
  // Reviews (read-only display)
  rating: number; reviews: Review[]
  // Support Contact
  support: { phone: string; whatsapp?: string; website?: string; email: string }
  // Online Presence
  online: { website?: string; facebook?: string; instagram?: string; tiktok?: string }
}
interface TeamMember {
  id: string; name: string; avatar: string
  roleLine: string                 // "Restaurant Manager : Esra Falafel 1" / "Delivery Driver : Zone A, Zone B"
  phone: string; active: boolean
}
interface RestaurantOrder {
  id: string                       // "#34432"
  status: 'new' | 'preparing' | 'ready' | 'ontheway' | 'pickedup' | 'delivered' | 'cancelled'
  driverName?: string              // undefined → "No Driver Assigned"
  time: string                     // "12:30 PM"
  customer: string                 // "Emma Schneider"
  address: string                  // "Reichenberger Straße 42, 10999 Berlin"
  payment: 'cash' | 'card'; amount: number   // 32.00
  items: number; distanceKm: number          // 3, 4.5
}
// Review type REUSED from drivers (name, avatar, rating, comment, time, photos?).
```

---

### ⚠️ MANDATORY seed data (`src/lib/mock/restaurants.ts`) — every data-driven section MUST be pre-filled
> **This is not optional.** The Team, Menu, Orders, and Reviews sections render from this mock data. If it is empty the sections show empty states (which is the bug being fixed). Seed at least the restaurant **"Esra Falafel 3"** (and "Esra Falafel 1") fully so every section has visible content on open. Reuse avatars/images already in the project's mock assets.

**Restaurant Information / Location / Support / Online (Esra Falafel 3):**
```
name "Esra Falafel 3" · status active · email esrafalafel3@domain.com · phone +49 52 043 32 53
managerId → Orlando Diggs · description "" · address: Musterstrasse 12, 3000 Bern
support: phone +49 72 542 00 20 · whatsapp +49 72 542 00 20 · website www.esrafalafel.com · email contact@esrafalafel.com
online: website www.esrafalafel.com · facebook https://www.facebook.com/esrafalafel · instagram https://www.instagram.com/esrafalafel · tiktok https://www.tiktok.com/@esrafalafel
```
**Operations:** activeMenu "Our Menu" · enableDelivery true · enableCashOnDelivery true ·
hours: [ { days:["Monday","Tuesday","Wednesday","Thursday","Friday"], from:"09:00", to:"23:00" }, { days:["Saturday","Sunday"], from:"09:00", to:"00:00" } ]

**Team (MUST render — Manager + 2 drivers):**
```
manager: { name:"Orlando Diggs", avatar:<asset>, roleLine:"Restaurant Manager : Esra Falafel 1", phone:"+49 72 542 00 20", active:true }
drivers: [
  { name:"Drew Cano",  avatar:<asset>, roleLine:"Delivery Driver : Zone A, Zone B", phone:"+49 72 235 00 20", active:true },
  { name:"Luca Muller", avatar:<asset>, roleLine:"Delivery Driver : Zone A, Zone B", phone:"+49 72 278 11 34", active:true },
]
```
**Menu (MUST render the preview card):** { name:"Our Menu", cover:<banner asset>, lastUpdated:"03/01/2026", products:25, categories:7 }

**Orders (MUST render — seed ≥ 5 cards so tabs have counts; matches the Orders screen):**
```
#34432 · new       · No Driver Assigned · 12:30 PM · Emma Schneider · Reichenberger Straße 42, 10999 Berlin · cash €32.00 · 3 items · 4.5Km
#34552 · preparing · Luca Muller        · 14:10 PM · Emma Schneider · Reichenberger Straße 42, 10999 Berlin · card €22.50 · 2 items · 4.2Km
#34553 · ontheway  · Luca Muller        · 14:10 PM · Laura Fischer · Schönhauser Allee 73, 10437 Berlin · card €22.50 · 2 items · 4.2Km
#34554 · ready     · Luca Muller        · 14:10 PM · Emma Schneider · Reichenberger Straße 42, 10999 Berlin · card €22.50 · 2 items · 4.2Km
#34555 · cancelled · Luca Muller        · 14:10 PM · Emma Schneider · Reichenberger Straße 42, 10999 Berlin · card €22.50 · 2 items · 4.2Km
```
Tab counts derive from the seeded array (`All`, `New`, `Preparing`, `Ready`, `Picked up`, `Delivered`, `Cancelled`).

**Reviews (MUST render — rating 4.5, 4 reviews):** use the SHARED reviews fixture (see core §6 `mockReviews`). Distribution: 5★ heavy, some 4★, one 3★ → "4.5 / (4 Reviews)".

> **Empty-state rule:** the empty state ("No orders" / "0.0 (0 Reviews)") is ONLY for a genuinely empty array. Seeded restaurants must NOT show it. A second restaurant MAY be seeded empty to demonstrate the empty state, but Esra Falafel 3 must be full.

---

### Page state — Edit flow wiring (mirror Drivers)
```tsx
type ModalState =
  | { type: 'edit'; restaurant: Restaurant; section?: RestaurantEditSection }
  | { type: 'saved' }
  | { type: 'fail' }
  /* ...existing create/delete states unchanged... */
  | null

type RestaurantEditSection =
  | 'info' | 'location' | 'operations' | 'team' | 'menu'
  | 'orders' | 'reviews' | 'support' | 'online'
```
**Edit flow:** Edit (card/row) → `EditRestaurantModal` (section modal) → Save → `ChangesSavedModal`; on failure → `FailModal`. Delete/Create flows unchanged.

---

### REUSED components in Edit Restaurant v2 (do NOT redefine)
- `StatusToggle` — header toggle + Operations toggles + Team member toggles.
- `ProfilePictureUpload` — restaurant picture row (upload/delete).
- `PhoneInput` — DE-default phone (Info, Support Contact).
- `SelectDropdown` — Assigned Manager, Active Menu (Operations + Menu sections).
- `MultiSelectDropdown` — Working Days in Operations.
- `MapPreview` — Location section map.
- `TimeInput` — From / To opening hours.
- `OrderStatusPill` — Orders cards (extend with 'ontheway' + 'cancelled' variants).
- `RatingStars` · `RatingBarChart` — Reviews section (reuse driver Reviews).
- `FilterTabs` · `ViewToggle` · `SearchInput` — Orders + Team toolbars.
- `ChangesSavedModal` · `FailModal` — save success / failure (reuse shared/drivers).
- `Button` · `Input` · `Avatar` · pagination row.
**NEW shared:** `TeamMemberCard` (Team section; build as shared, reusable).

---

### i18n — restaurants namespace additions (Edit Restaurant)
> Add these keys to the existing `restaurants` namespace in `messages/en.json` + `messages/de.json` (mirrored, key-for-key). Reuse existing `common` keys (cancel, save, search, view toggle, filters, pagination, delete) where present.
```
restaurants.edit.nav: { info, location, operations, team, menu, orders, reviews, support, online }
restaurants.info:      { title, picture, pictureHint, delete, name, email, phone, manager, description, descriptionPlaceholder }
restaurants.location:  { title, street, number, zip, city }
restaurants.operations:{ title, activeMenu, enableDelivery, enableCod, hoursTitle, workingDays, from, to, addMore, delete }
restaurants.team:      { title, manager, drivers, edit, delete }   // roleLine values come from data
restaurants.menu:      { title, activeMenu, lastUpdated, products, categories }
restaurants.orders:    { title, tabs: { all, new, preparing, ready, pickedup, delivered, cancelled },
                         noDriver, items, status: { new, preparing, ready, ontheway, cancelled } }
restaurants.reviews:   { title, reviewsCount }                     // "{count} Reviews"
restaurants.support:   { title, phone, whatsapp, website, email }
restaurants.online:    { title, website, facebook, instagram, tiktok }
```
**German mirrors (watch length — §5b R5 + German layout risk):**
"Restaurantinformationen" / "Standort" / "Betrieb" / "Team" / "Menü" / "Bestellungen" / "Bewertungen" /
"Support-Kontakt" / "Online-Präsenz"; "Zugewiesener Manager", "Lieferung aktivieren",
"Nachnahme aktivieren" (Enable Cash On Delivery), "Öffnungstage & Zeiten", "Arbeitstage",
"Mehr hinzufügen" (Add More), "Kein Fahrer zugewiesen" (No Driver Assigned).
Longest risk: "Nachnahme aktivieren" toggle label + the Orders tab row — allow wrap, never fixed-width.

---