'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ClientQuestionOption } from '@/actions/quizActions';

export interface OptionRadioGroupProps {
  options: ClientQuestionOption[];
  selectedOption?: 'A' | 'B' | 'C' | 'D';
  onSelectOption: (key: 'A' | 'B' | 'C' | 'D') => void;
  disabled?: boolean;
}

export const OptionRadioGroup: React.FC<OptionRadioGroupProps> = ({
  options,
  selectedOption,
  onSelectOption,
  disabled = false,
}) => {
  return (
    <div
      role="radiogroup"
      aria-label="Pilihan Jawaban"
      className="flex flex-col gap-3 w-full"
    >
      {options.map((opt) => {
        const isSelected = selectedOption === opt.key;

        return (
          <label
            key={opt.key}
            onClick={() => !disabled && onSelectOption(opt.key)}
            className={`group relative flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 ${
              disabled ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.99]'
            } ${
              isSelected
                ? 'bg-[#E8DEFF]/70 border-2 border-[#7F54F8] text-[#061B38] shadow-sm ring-2 ring-[#7F54F8]/15 -translate-y-0.5'
                : 'bg-white hover:bg-[#F0F3FF] border border-[#CAC3D8]/50 hover:border-[#7F54F8]/40 shadow-xs hover:-translate-y-0.5 hover:shadow-sm'
            }`}
          >
            {/* Native Hidden Radio for standard form & screen reader accessibility */}
            <input
              type="radio"
              name="quiz_option"
              value={opt.key}
              checked={isSelected}
              onChange={() => !disabled && onSelectOption(opt.key)}
              disabled={disabled}
              className="sr-only"
            />

            {/* Custom Radio Circle Indicator */}
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                isSelected
                  ? 'bg-[#7F54F8] shadow-xs'
                  : 'bg-[#F0F3FF] border-2 border-[#CAC3D8] group-hover:border-[#7F54F8]'
              }`}
            >
              {isSelected ? (
                <div className="w-2 h-2 rounded-full bg-white animate-in zoom-in-75 duration-150" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-transparent" />
              )}
            </div>

            {/* Option Content Body */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className={`text-xs font-bold transition-colors ${
                    isSelected
                      ? 'text-[#6636DE]'
                      : 'text-[#494455] group-hover:text-[#7F54F8]'
                  }`}
                >
                  Opsi {opt.key} {isSelected && '(Terpilih)'}
                </span>
                {isSelected && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7F54F8] shrink-0 fill-[#7F54F8] text-white" />
                )}
              </div>

              <p
                className={`text-xs sm:text-sm leading-relaxed transition-colors ${
                  isSelected ? 'text-[#061B38] font-semibold' : 'text-[#494455] font-normal'
                }`}
              >
                {opt.text}
              </p>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default OptionRadioGroup;
