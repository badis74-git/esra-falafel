'use client'

import { Button } from '@/components/ui/Button'
import { Trash2, Upload, User } from 'lucide-react'
import { useRef } from 'react'

interface ProfilePictureUploadProps {
  src: string | null
  onChange: (src: string) => void
  onDelete: () => void
}

export function ProfilePictureUpload({ src, onChange, onDelete }: ProfilePictureUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onChange(URL.createObjectURL(file))
  }

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden flex-shrink-0">
        {src
          ? <img src={src} alt="profile" className="w-full h-full object-cover" />
          : <User size={28} className="text-neutral-400" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-700">Profile picture</p>
        <p className="text-xs text-neutral-500">PNG, JPEG under 15MB</p>
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      {src ? (
        <button
          type="button"
          onClick={onDelete}
          className="flex items-center gap-1.5 text-sm text-danger hover:text-red-700 transition-colors flex-shrink-0"
        >
          <Trash2 size={14} /> Delete
        </button>
      ) : (
        <Button type="button" variant="secondary" fullWidth={false} size="md" onClick={() => fileRef.current?.click()}>
          <Upload size={14} /> Upload Picture
        </Button>
      )}
    </div>
  )
}
