'use client'

import { Download, Eye, FileText, Trash2 } from 'lucide-react'

interface FileAttachmentRowProps {
  fileName: string
  date: string
  size: string
  onView?: () => void
  onDownload?: () => void
  onDelete: () => void
}

export function FileAttachmentRow({ fileName, date, size, onView, onDownload, onDelete }: FileAttachmentRowProps) {
  return (
    <div className="flex items-center gap-3 border border-neutral-300 rounded-lg p-4 bg-white">
      <FileText size={32} className="text-red-500 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-900 truncate">{fileName}</p>
        <p className="text-xs text-neutral-500">{date} · {size}</p>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        {onView && (
          <button type="button" onClick={onView} className="p-1.5 text-neutral-500 hover:text-neutral-700 transition-colors">
            <Eye size={16} />
          </button>
        )}
        {onDownload && (
          <button type="button" onClick={onDownload} className="p-1.5 text-neutral-500 hover:text-neutral-700 transition-colors">
            <Download size={16} />
          </button>
        )}
        <button type="button" onClick={onDelete} className="p-1.5 text-danger hover:text-red-700 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}
