# Esra Falafel — Module: Delivery Drivers (v2)
> Load this together with `design-system.md` (core) when building or editing the Drivers module.
> Core has: tokens (§1–§5), Mobile rules (§5b), shared component map (§6), patterns (§9), i18n setup (§8).
> Drivers-specific colors/typography already live in core §1/§2 (order pills, verification, review stars).

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
{ status: 'new' | 'preparing' | 'ready' | 'ontheway' | 'cancelled' }
// Rounded-full pill, 12px font-semibold. Color map:
//   new        → text order-new      / bg order-new-bg        ("New")
//   preparing  → text order-preparing / bg order-preparing-bg ("Preparing")
//   ready      → text white          / bg order-ready          ("Ready for pick up")  ← solid green
//   ontheway   → text order-ontheway / bg order-ontheway-bg   ("On the Way")
//   cancelled  → text white          / bg danger               ("Cancelled")          ← NEW (Edit Restaurant Orders)
// Labels are i18n keys; see §8 drivers.orders.status.* and restaurants.orders.status.*
// NOTE: Edit Restaurant Orders cards (modules/restaurants.md) use solid-fill pill variants; reuse this
//   component and add the 'cancelled' variant rather than creating a second pill.
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



---

## Page — Delivery Drivers

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



---

## i18n — drivers namespace

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