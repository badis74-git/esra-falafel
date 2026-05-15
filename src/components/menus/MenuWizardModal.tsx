'use client'

import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Input } from '@/components/ui/Input'
import { MultiSelectDropdown } from '@/components/ui/MultiSelectDropdown'
import { PdfUploadZone } from '@/components/ui/PdfUploadZone'
import { ProfilePictureUpload } from '@/components/ui/ProfilePictureUpload'
import { SearchInput } from '@/components/ui/SearchInput'
import { StatusToggle } from '@/components/ui/StatusToggle'
import { StepperHeader } from '@/components/ui/StepperHeader'
import { ViewToggle } from '@/components/ui/ViewToggle'
import { CategorySelectionRow } from '@/components/menus/CategorySelectionRow'
import { ProductSelectionRow } from '@/components/menus/ProductSelectionRow'
import { mockCategories, mockProducts, Category, Product } from '@/lib/mock/menus'
import { mockRestaurants } from '@/lib/mock/restaurants'
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Filter,
  Plus,
  X,
} from 'lucide-react'
import { useState } from 'react'

export interface MenuFormData {
  image: string | null
  name: string
  assignedBranches: string[]
  description: string
  pdfFile: { name: string; date: string; size: string } | null
  selectedCategories: string[]
  selectedProducts: string[]
  status: boolean
}

const DEFAULT_FORM: MenuFormData = {
  image: null,
  name: '',
  assignedBranches: [],
  description: '',
  pdfFile: null,
  selectedCategories: [],
  selectedProducts: [],
  status: true,
}

const WIZARD_STEPS = [
  { number: 1, label: 'Menu Information' },
  { number: 2, label: 'Categories' },
  { number: 3, label: 'Products' },
  { number: 4, label: 'Overview' },
]

const BRANCH_OPTIONS = mockRestaurants.map((r) => ({ label: r.name, value: r.name }))

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold text-primary mb-4">{children}</h3>
}

interface MiniToolbarProps {
  view: 'grid' | 'list'
  onViewChange: (v: 'grid' | 'list') => void
  search: string
  onSearch: (s: string) => void
}

function MiniToolbar({ view, onViewChange, search, onSearch }: MiniToolbarProps) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <ViewToggle view={view} onChange={onViewChange} />
      <SearchInput
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1"
      />
      <button
        type="button"
        className="flex items-center gap-1.5 px-3 py-2 text-sm border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-100 transition-colors"
      >
        <Filter size={14} /> Filters
      </button>
    </div>
  )
}

interface CategoryTabsProps {
  categories: Category[]
  selectedCatIds: string[]
  activeTab: string
  onTabChange: (tab: string) => void
}

function CategoryTabs({ categories, selectedCatIds, activeTab, onTabChange }: CategoryTabsProps) {
  const selectedCats = categories.filter((c) => selectedCatIds.includes(c.id))
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      <button
        type="button"
        onClick={() => onTabChange('all')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          activeTab === 'all'
            ? 'bg-primary text-white'
            : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
        }`}
      >
        View all
      </button>
      {selectedCats.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onTabChange(cat.id)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === cat.id
              ? 'bg-primary text-white'
              : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}

interface PaginationProps {
  className?: string
}

function Pagination({ className = '' }: PaginationProps) {
  return (
    <div className={`flex items-center justify-center gap-1 mt-4 text-sm ${className}`}>
      <button
        type="button"
        className="flex items-center gap-1 px-2 py-1 text-neutral-500 hover:text-neutral-700 disabled:opacity-40"
        disabled
      >
        <ChevronLeft size={14} /> Previous
      </button>
      {[1, 2, 3].map((p) => (
        <button
          key={p}
          type="button"
          className={`w-7 h-7 rounded text-sm font-medium transition-colors ${
            p === 1 ? 'bg-primary text-white' : 'text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          {p}
        </button>
      ))}
      <span className="text-neutral-400 px-1">...</span>
      {[8, 9, 10].map((p) => (
        <button
          key={p}
          type="button"
          className="w-7 h-7 rounded text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className="flex items-center gap-1 px-2 py-1 text-neutral-700 hover:text-neutral-900"
      >
        Next <ChevronRight size={14} />
      </button>
    </div>
  )
}

// --- Step sub-components ---

interface Step1Props {
  formData: MenuFormData
  updateForm: (patch: Partial<MenuFormData>) => void
}

function Step1({ formData, updateForm }: Step1Props) {
  function handlePdfUpload(file: File) {
    const sizeKB = Math.round(file.size / 1024)
    const sizeStr = sizeKB >= 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`
    const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
    updateForm({ pdfFile: { name: file.name, date, size: sizeStr } })
  }

  return (
    <div className="space-y-5">
      <ProfilePictureUpload
        src={formData.image}
        onChange={(src) => updateForm({ image: src })}
        onDelete={() => updateForm({ image: null })}
      />

      <SectionTitle>1. Menu Information</SectionTitle>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Menu Name *"
          leftIcon={<ClipboardList size={16} />}
          placeholder="Enter menu name"
          value={formData.name}
          onChange={(e) => updateForm({ name: e.target.value })}
        />
        <MultiSelectDropdown
          label="Assigned Branches *"
          options={BRANCH_OPTIONS}
          value={formData.assignedBranches}
          onChange={(vals) => updateForm({ assignedBranches: vals })}
          placeholder="Select branches"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-neutral-700">Menu Description</label>
        <textarea
          rows={3}
          placeholder="Enter menu description (optional)"
          value={formData.description}
          onChange={(e) => updateForm({ description: e.target.value })}
          className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-sm text-neutral-900 placeholder:text-neutral-500 shadow-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-neutral-700">Menu PDF Format</label>
        <PdfUploadZone
          file={formData.pdfFile}
          onUpload={handlePdfUpload}
          onDelete={() => updateForm({ pdfFile: null })}
          onView={() => {}}
          onDownload={() => {}}
        />
      </div>
    </div>
  )
}

interface Step2Props {
  formData: MenuFormData
  updateForm: (patch: Partial<MenuFormData>) => void
  readOnly?: boolean
}

function Step2({ formData, updateForm, readOnly = false }: Step2Props) {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const filtered = mockCategories.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  )

  const allIds = filtered.map((c) => c.id)
  const isAllSelected = allIds.length > 0 && allIds.every((id) => formData.selectedCategories.includes(id))

  function toggleAll() {
    if (isAllSelected) {
      updateForm({ selectedCategories: formData.selectedCategories.filter((id) => !allIds.includes(id)) })
    } else {
      const merged = Array.from(new Set([...formData.selectedCategories, ...allIds]))
      updateForm({ selectedCategories: merged })
    }
  }

  function toggleOne(id: string) {
    if (formData.selectedCategories.includes(id)) {
      updateForm({ selectedCategories: formData.selectedCategories.filter((x) => x !== id) })
    } else {
      updateForm({ selectedCategories: [...formData.selectedCategories, id] })
    }
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div>
      <SectionTitle>2. Categories</SectionTitle>
      <MiniToolbar view={view} onViewChange={setView} search={search} onSearch={setSearch} />

      {/* Select All */}
      <div className="flex items-center gap-2 py-2 px-2 border-b border-neutral-200">
        <Checkbox
          id="cat-select-all"
          checked={isAllSelected}
          onChange={readOnly ? undefined : toggleAll}
          label="Select All"
          readOnly={readOnly}
        />
      </div>

      {view === 'grid' ? (
        <div>
          {filtered.map((cat) => (
            <CategorySelectionRow
              key={cat.id}
              category={cat}
              selected={formData.selectedCategories.includes(cat.id)}
              onToggle={() => toggleOne(cat.id)}
              expanded={!!expanded[cat.id]}
              onExpandToggle={() => toggleExpand(cat.id)}
              readOnly={readOnly}
            />
          ))}
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="text-left py-2.5 px-3 w-8" />
              <th className="text-left py-2.5 px-3 font-medium text-neutral-600">Category Name</th>
              <th className="text-left py-2.5 px-3 font-medium text-neutral-600">Sub-categories</th>
              <th className="text-left py-2.5 px-3 font-medium text-neutral-600">Products</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((cat) => (
              <tr key={cat.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                <td className="py-2.5 px-3">
                  {readOnly ? (
                    <div className="pointer-events-none">
                      <Checkbox id={`cat-list-${cat.id}`} checked={formData.selectedCategories.includes(cat.id)} onChange={() => {}} />
                    </div>
                  ) : (
                    <Checkbox id={`cat-list-${cat.id}`} checked={formData.selectedCategories.includes(cat.id)} onChange={() => toggleOne(cat.id)} />
                  )}
                </td>
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0" />
                    <span className="font-medium text-neutral-900">{cat.name}</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-neutral-600">
                  {cat.subCategories.length > 0 ? cat.subCategories.join(', ') : '–'}
                </td>
                <td className="py-2.5 px-3 font-medium text-neutral-900">{cat.products}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

interface Step3Props {
  formData: MenuFormData
  updateForm: (patch: Partial<MenuFormData>) => void
  readOnly?: boolean
}

function Step3({ formData, updateForm, readOnly = false }: Step3Props) {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const filteredByTab = activeTab === 'all'
    ? mockProducts
    : mockProducts.filter((p) => {
        const cat = mockCategories.find((c) => c.id === activeTab)
        return cat ? p.category.toLowerCase().includes(cat.name.toLowerCase()) : true
      })

  const filtered: Product[] = filteredByTab.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  )

  const allIds = filtered.map((p) => p.id)
  const isAllSelected = allIds.length > 0 && allIds.every((id) => formData.selectedProducts.includes(id))

  function toggleAll() {
    if (isAllSelected) {
      updateForm({ selectedProducts: formData.selectedProducts.filter((id) => !allIds.includes(id)) })
    } else {
      const merged = Array.from(new Set([...formData.selectedProducts, ...allIds]))
      updateForm({ selectedProducts: merged })
    }
  }

  function toggleOne(id: string) {
    if (formData.selectedProducts.includes(id)) {
      updateForm({ selectedProducts: formData.selectedProducts.filter((x) => x !== id) })
    } else {
      updateForm({ selectedProducts: [...formData.selectedProducts, id] })
    }
  }

  return (
    <div>
      <SectionTitle>3. Products</SectionTitle>
      <MiniToolbar view={view} onViewChange={setView} search={search} onSearch={setSearch} />

      <CategoryTabs
        categories={mockCategories}
        selectedCatIds={formData.selectedCategories}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Select All */}
      <div className="flex items-center gap-2 py-2 px-2 border-b border-neutral-200">
        <Checkbox
          id="prod-select-all"
          checked={isAllSelected}
          onChange={readOnly ? undefined : toggleAll}
          label="Select All"
          readOnly={readOnly}
        />
      </div>

      {view === 'grid' ? (
        <div>
          {filtered.map((prod) => (
            <ProductSelectionRow
              key={prod.id}
              product={prod}
              selected={formData.selectedProducts.includes(prod.id)}
              onToggle={() => toggleOne(prod.id)}
              view="grid"
              readOnly={readOnly}
            />
          ))}
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="text-left py-2.5 px-3 w-8" />
              <th className="text-left py-2.5 px-3 font-medium text-neutral-600">Product Name</th>
              <th className="text-left py-2.5 px-3 font-medium text-neutral-600">Category</th>
              <th className="text-left py-2.5 px-3 font-medium text-neutral-600">Dietary Type</th>
              <th className="text-left py-2.5 px-3 font-medium text-neutral-600">Price</th>
              <th className="text-left py-2.5 px-3 font-medium text-neutral-600">Discount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((prod) => (
              <ProductSelectionRow
                key={prod.id}
                product={prod}
                selected={formData.selectedProducts.includes(prod.id)}
                onToggle={() => toggleOne(prod.id)}
                view="list"
                readOnly={readOnly}
              />
            ))}
          </tbody>
        </table>
      )}

      <Pagination />
    </div>
  )
}

// --- Main wizard ---

interface MenuWizardModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: () => void
  initialData?: Partial<MenuFormData>
  mode?: 'create' | 'update'
}

export function MenuWizardModal({
  isOpen,
  onClose,
  onCreated,
  initialData,
  mode = 'create',
}: MenuWizardModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<MenuFormData>({ ...DEFAULT_FORM, ...initialData })

  function updateForm(patch: Partial<MenuFormData>) {
    setFormData((prev) => ({ ...prev, ...patch }))
  }

  const step1Valid = formData.name.trim().length > 0 && formData.assignedBranches.length > 0
  const step2Valid = formData.selectedCategories.length > 0
  const step3Valid = formData.selectedProducts.length > 0

  function canNext() {
    if (step === 1) return step1Valid
    if (step === 2) return step2Valid
    if (step === 3) return step3Valid
    return true
  }

  function handleNext() {
    if (canNext()) setStep((s) => s + 1)
  }

  function handleBack() {
    setStep((s) => s - 1)
  }

  function handleSubmit() {
    onCreated()
  }

  if (!isOpen) return null

  const title = mode === 'create' ? 'Add New Menu' : formData.name

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-table-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-neutral-900">{title}</h2>
            <StatusToggle
              checked={formData.status}
              onChange={(val) => updateForm({ status: val })}
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 pt-4 flex-shrink-0">
          <StepperHeader steps={WIZARD_STEPS} currentStep={step} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {step === 1 && <Step1 formData={formData} updateForm={updateForm} />}
          {step === 2 && <Step2 formData={formData} updateForm={updateForm} />}
          {step === 3 && <Step3 formData={formData} updateForm={updateForm} />}
          {step === 4 && (
            <div className="space-y-8">
              {/* Step 1 overview */}
              <div>
                <ProfilePictureUpload
                  src={formData.image}
                  onChange={() => {}}
                  onDelete={() => {}}
                />
                <SectionTitle>1. Menu Information</SectionTitle>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-neutral-500">Menu Name</label>
                    <div className="flex items-center gap-2 border border-neutral-200 rounded-lg px-3 py-2.5 bg-neutral-50">
                      <FileText size={14} className="text-neutral-400" />
                      <span className="text-sm text-neutral-900">{formData.name}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-neutral-500">Assigned Branches</label>
                    <div className="border border-neutral-200 rounded-lg px-3 py-2.5 bg-neutral-50 text-sm text-neutral-900">
                      {formData.assignedBranches.join(', ') || '–'}
                    </div>
                  </div>
                </div>
                {formData.description && (
                  <div className="flex flex-col gap-1 mb-4">
                    <label className="text-xs font-medium text-neutral-500">Menu Description</label>
                    <div className="border border-neutral-200 rounded-lg px-3 py-2.5 bg-neutral-50 text-sm text-neutral-900">
                      {formData.description}
                    </div>
                  </div>
                )}
                {formData.pdfFile && (
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-neutral-500">Menu PDF Format</label>
                    <PdfUploadZone
                      file={formData.pdfFile}
                      onUpload={() => {}}
                      onDelete={() => {}}
                    />
                  </div>
                )}
              </div>

              {/* Step 2 overview (read-only) */}
              <Step2 formData={formData} updateForm={updateForm} />

              {/* Step 3 overview */}
              <Step3 formData={formData} updateForm={updateForm} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-table-border px-6 py-4 flex items-center justify-between gap-3">
          {step === 1 ? (
            <Button variant="secondary" fullWidth={false} onClick={onClose}>
              Cancel
            </Button>
          ) : (
            <Button variant="secondary" fullWidth={false} onClick={handleBack}>
              <ChevronLeft size={14} /> Previous
            </Button>
          )}

          {step < 4 ? (
            <Button
              variant="primary"
              fullWidth={false}
              onClick={handleNext}
              disabled={!canNext()}
            >
              Next <ChevronRight size={14} />
            </Button>
          ) : (
            <Button variant="primary" fullWidth={false} onClick={handleSubmit}>
              {mode === 'create' ? (
                <><Plus size={14} /> Create Menu</>
              ) : (
                'Save Changes'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
