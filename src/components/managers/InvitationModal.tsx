'use client'

import { Button } from '@/components/ui/Button'
import { Copy, Plus, User } from 'lucide-react'
import { useState } from 'react'

interface InvitationModalProps {
  email: string
  onClose: () => void
  onCreateNew: () => void
}

const INVITE_URL = 'https://webapp.com/invite/drewcanro'

export function InvitationModal({ email, onClose, onCreateNew }: InvitationModalProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(INVITE_URL).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-[16px] shadow-dashboard-modal w-full max-w-md p-5 sm:p-8 flex flex-col items-center text-center overflow-y-auto max-h-[90vh]">
        {/* Illustration */}
        <div className="w-20 h-20 rounded-full bg-neutral-200 flex items-center justify-center mb-5">
          <div className="flex items-center gap-1">
            <User size={22} className="text-neutral-500" />
            <div className="flex flex-col gap-1">
              <div className="w-6 h-1 bg-neutral-400 rounded" />
              <div className="w-4 h-1 bg-neutral-400 rounded" />
              <div className="w-5 h-1 bg-neutral-400 rounded" />
            </div>
          </div>
        </div>

        <h2 className="text-lg font-bold text-neutral-900 mb-2">Manager Created Successfully</h2>
        <p className="text-sm text-neutral-500 mb-5 leading-relaxed">
          An invitation link has been sent to <span className="font-medium text-neutral-700">{email}</span>.{' '}
          You can also copy the link below and share it manually.
        </p>

        {/* Invite link row */}
        <div className="w-full flex items-center gap-2 mb-5">
          <input
            readOnly
            value={INVITE_URL}
            className="flex-1 min-w-0 px-3 py-2.5 text-sm border border-neutral-300 rounded-lg bg-neutral-100 text-neutral-700 focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors flex-shrink-0"
          >
            <Copy size={13} />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <Button variant="primary" onClick={onClose} className="mb-3">
          Return To Managers List
        </Button>
        <Button variant="secondary" onClick={onCreateNew}>
          <Plus size={14} /> Create New Manager
        </Button>
      </div>
    </div>
  )
}
