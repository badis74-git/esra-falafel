# Esra Falafel — Module: Add-ons
> Load with `design-system.md` (core) when building/editing the Add-ons module.

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


---

## Page — Add-ons Management

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


---

## i18n — addOns namespace

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

