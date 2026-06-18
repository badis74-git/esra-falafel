'use client'

interface Step {
  number: number
  label: string
}

interface StepperHeaderProps {
  steps: Step[]
  currentStep: number
  centered?: boolean
}

export function StepperHeader({ steps, currentStep, centered = false }: StepperHeaderProps) {
  const totalSteps = steps.length
  const currentStepObj = steps.find((s) => s.number === currentStep) ?? steps[0]
  const progressPct = (currentStep / totalSteps) * 100

  return (
    <div className="bg-primary rounded-[12px] px-6 py-4 mb-5">
      {/* Mobile: compact "Step X of N · Label" + progress bar */}
      <div className="flex md:hidden flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.7)' }}>·</span>
          <span className="text-[13px] font-semibold text-white">{currentStepObj.label}</span>
        </div>
        <div className="h-1 rounded-full w-full" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
          <div
            className="h-1 rounded-full bg-white transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Desktop: full circle stepper */}
      <div className={`hidden md:flex items-start ${centered ? 'justify-center' : 'justify-between'}`}>
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep
          const isActive = step.number === currentStep
          const isLast = index === steps.length - 1

          return (
            <div key={step.number} className={`flex items-start ${centered ? '' : 'flex-1'}`}>
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                  style={{
                    backgroundColor: isCompleted || isActive ? 'white' : 'rgba(255,255,255,0.3)',
                    color: isCompleted || isActive ? '#2D6A3F' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {String(step.number).padStart(2, '0')}
                </div>
                <span
                  className="text-[11px] mt-1.5 text-center leading-tight max-w-[72px]"
                  style={{
                    color: isActive ? 'white' : isCompleted ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)',
                    fontWeight: isActive ? 700 : 400,
                  }}
                >
                  {step.label}
                </span>
              </div>

              {!isLast && (
                <div
                  className={`h-px mt-4 mx-2 ${centered ? 'w-10' : 'flex-1'}`}
                  style={{ backgroundColor: isCompleted ? 'white' : 'rgba(255,255,255,0.3)' }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
