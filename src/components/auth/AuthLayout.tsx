'use client'

import { LanguageSelector } from '@/components/ui/LanguageSelector'
import { useTranslations } from 'next-intl'
import { ReactNode, useEffect, useState } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const t = useTranslations('auth.slides')
  const [activeSlide, setActiveSlide] = useState(0)

  const slides = [
    { title: t('slide1.title'), subtitle: t('slide1.subtitle') },
    { title: t('slide2.title'), subtitle: t('slide2.subtitle') },
    { title: t('slide3.title'), subtitle: t('slide3.subtitle') },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

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
