import Image from 'next/image'

export function BrandHeader() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-12 w-12 rounded-full overflow-hidden bg-primary-light flex items-center justify-center border border-neutral-300 flex-shrink-0">
        {/* Falafel/vegan badge style logo */}
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
          <circle cx="24" cy="24" r="22" fill="#2D6A3F" />
          <text x="24" y="30" textAnchor="middle" fontSize="22" fill="white">🧆</text>
        </svg>
      </div>
      <span className="text-lg font-bold text-neutral-900">Esra Falafel</span>
    </div>
  )
}
