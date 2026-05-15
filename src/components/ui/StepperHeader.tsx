'use client'

interface Step {
  number: number
  label: string
}

interface StepperHeaderProps {
  steps: Step[]
  currentStep: number
}

export function StepperHeader({ steps, currentStep }: StepperHeaderProps) {
  return (
    <div className="bg-primary rounded-[12px] px-6 py-4 mb-5">
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep
          const isActive = step.number === currentStep
          const isLast = index === steps.length - 1

          return (
            <div key={step.number} className="flex items-start flex-1">
              {/* Step */}
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

              {/* Connector line */}
              {!isLast && (
                <div
                  className="flex-1 h-px mt-4 mx-2"
                  style={{
                    backgroundColor: isCompleted ? 'white' : 'rgba(255,255,255,0.3)',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
