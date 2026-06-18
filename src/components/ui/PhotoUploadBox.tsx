'use client'

import { ImagePlus, X } from 'lucide-react'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface PhotoUploadBoxProps {
  label?: string
  value?: string
  onUpload: (src: string) => void
  onRemove: () => void
  aspect?: 'wide' | 'square'
}

export function PhotoUploadBox({ label, value, onUpload, onRemove, aspect = 'wide' }: PhotoUploadBoxProps) {
  const fileRef = useRef<HTMLInputElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onUpload(URL.createObjectURL(file))
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-neutral-700">{label}</label>
      )}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
      {value ? (
        <div
          className={cn(
            'relative rounded-lg overflow-hidden border border-neutral-300',
            aspect === 'square' ? 'w-[120px] h-[120px]' : 'w-full h-36'
          )}
        >
          <img src={value} alt="upload" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-1.5 right-1.5 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow text-neutral-700 hover:text-danger transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className={cn(
            'flex flex-col items-center justify-center gap-2 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-primary transition-colors',
            aspect === 'square' ? 'w-[120px] h-[120px]' : 'w-full h-36'
          )}
        >
          <ImagePlus size={24} className="text-neutral-400" />
          <span className="text-sm text-neutral-500">Upload photo</span>
        </button>
      )}
    </div>
  )
}
