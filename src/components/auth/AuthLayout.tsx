'use client'

import { LanguageSelector } from '@/components/ui/LanguageSelector'
import { ReactNode, useEffect, useState } from 'react'

const slides = [
  {
    title: "Taste Berlin's\nBest Falafel",
    subtitle:
      'Freshly made falafel, shawarma, and vegan favorites crafted daily and delivered from your nearest Esra Falafel branch.',
  },
  {
    title: 'Quick Pickup\nor Delivery',
    subtitle:
      'Order in seconds, track your delivery in real time, or pick up your meal fresh from the store.',
  },
  {
    title: 'Vegan or Meat,\nYour Choice',
    subtitle:
      'Choose your bread, fillings, sauces, and extras. Build your perfect meal vegan or meat, just how you like it.',
  },
]

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[activeSlide]

  return (
    <div className="min-h-screen flex bg-neutral-100">
      {/* Left panel — hidden on mobile */}
      <div
        className="hidden lg:flex flex-col justify-end relative overflow-hidden"
        style={{
          width: '49%',
          background: 'linear-gradient(160deg, #1E4D2B 0%, #2D6A3F 100%)',
          borderRadius: '0 80px 80px 0',
          minHeight: '100vh',
        }}
      >
        {/* Slide content */}
        <div className="px-12 pb-16">
          <h2 className="text-white font-bold text-[36px] leading-[44px] whitespace-pre-line mb-4">
            {slide.title}
          </h2>
          <p className="text-white/75 text-[15px] leading-[24px] max-w-[340px]">
            {slide.subtitle}
          </p>

          {/* Dots */}
          <div className="flex gap-2 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeSlide ? 'w-6 bg-white' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div
        className="flex-1 flex flex-col min-h-screen bg-white relative"
        style={{ minWidth: 0 }}
      >
        {/* Language selector top-right */}
        <div className="absolute top-5 right-5 z-10">
          <LanguageSelector />
        </div>

        {/* Centered form area */}
        <div className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="w-full max-w-[420px]">{children}</div>
        </div>
      </div>
    </div>
  )
}
