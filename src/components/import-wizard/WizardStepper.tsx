'use client';

import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface WizardStepItem {
  id: number;
  label: string;
  title: string;
}

export const WIZARD_STEPS: WizardStepItem[] = [
  { id: 1, label: 'LANGKAH 1', title: 'Unduh Template & Upload' },
  { id: 2, label: 'LANGKAH 2', title: 'Konfigurasi Enroll Otomatis' },
  { id: 3, label: 'LANGKAH 3', title: 'Validasi & Error Checking' },
  { id: 4, label: 'LANGKAH 4', title: 'Hasil & Cetak Kredensial' },
];

export interface WizardStepperProps {
  currentStep: 1 | 2 | 3 | 4;
  hasErrors?: boolean;
  className?: string;
  onStepClick?: (step: 1 | 2 | 3 | 4) => void;
}

export function WizardStepper({
  currentStep,
  hasErrors = false,
  className,
  onStepClick,
}: WizardStepperProps) {
  return (
    <div
      className={cn(
        'w-full rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-3 shadow-xs',
        className
      )}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {WIZARD_STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isErrorStep = isActive && step.id === 3 && hasErrors;
          const isPending = step.id > currentStep;

          return (
            <div
              key={step.id}
              onClick={() => {
                // Only allow clicking to completed steps or current
                if (onStepClick && isCompleted) {
                  onStepClick(step.id as 1 | 2 | 3 | 4);
                }
              }}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all select-none',
                isActive && !isErrorStep && 'bg-[#F0EEFE]/80 border border-[#DDD6FE]',
                isErrorStep && 'bg-rose-50/80 border border-rose-200',
                isCompleted && 'bg-slate-50/80 hover:bg-slate-100/80 cursor-pointer',
                isPending && 'opacity-60 cursor-default'
              )}
            >
              {/* Step Icon / Number Indicator */}
              <div
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold transition-colors',
                  isCompleted && 'bg-[#7F54F8] text-white shadow-xs',
                  isActive && !isErrorStep && 'bg-[#7F54F8] text-white shadow-xs shadow-[#7F54F8]/30',
                  isErrorStep && 'bg-rose-500 text-white shadow-xs shadow-rose-500/30',
                  isPending && 'bg-slate-100 text-slate-400 border border-slate-200'
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 stroke-[2.75]" />
                ) : isErrorStep ? (
                  <AlertTriangle className="h-4 w-4 stroke-[2.5]" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>

              {/* Step Texts */}
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-wider',
                    isActive && !isErrorStep && 'text-[#7F54F8]',
                    isErrorStep && 'text-rose-600',
                    isCompleted && 'text-[#7F54F8]',
                    isPending && 'text-slate-400'
                  )}
                >
                  {step.label}
                </p>
                <h4
                  className={cn(
                    'truncate text-xs sm:text-[13px] font-bold leading-tight',
                    isActive && 'text-[#061B38]',
                    isCompleted && 'text-[#061B38]',
                    isPending && 'text-slate-400'
                  )}
                >
                  {step.title}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
