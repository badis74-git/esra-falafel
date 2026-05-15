'use client'

import { Download, Eye, FileText, Trash2, Upload } from 'lucide-react'
import { useRef } from 'react'

interface PdfFile {
  name: string
  date: string
  size: string
}

interface PdfUploadZoneProps {
  file?: PdfFile | null
  onUpload: (file: File) => void
  onView?: () => void
  onDownload?: () => void
  onDelete: () => void
}

export function PdfUploadZone({ file, onUpload, onView, onDownload, onDelete }: PdfUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f && f.type === 'application/pdf') onUpload(f)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) onUpload(f)
  }

  if (file) {
    return (
      <div className="flex items-center gap-3 border border-neutral-300 rounded-lg p-4 bg-white">
        <FileText size={32} className="text-red-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-neutral-900 truncate">{file.name}</p>
          <p className="text-xs text-neutral-500">{file.date} · {file.size}</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {onView && (
            <button
              type="button"
              onClick={onView}
              className="p-1.5 text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              <Eye size={16} />
            </button>
          )}
          {onDownload && (
            <button
              type="button"
              onClick={onDownload}
              className="p-1.5 text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              <Download size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 text-danger hover:text-red-700 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="border-2 border-dashed border-neutral-300 rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleChange}
      />
      <Upload size={24} className="text-neutral-400" />
      <p className="text-sm text-center">
        <span className="text-primary font-medium cursor-pointer">Click to upload</span>
        <span className="text-neutral-500"> or drag and drop</span>
      </p>
      <p className="text-xs text-neutral-500">PDF (max. 1MB)</p>
    </div>
  )
}
