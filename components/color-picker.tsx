"use client"

import type React from "react"

import { forwardRef } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export const predefinedColors = [
  { name: "Gray", value: "#d3d3d3" },
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Green", value: "#10b981" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Purple", value: "#a855f7" },
  { name: "Pink", value: "#ec4899" },  
]

interface ColorPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  disabled?: boolean
}

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ value, onChange, onBlur, disabled, className, ...props }, ref) => {
    const handleColorChange = (colorValue: string) => {
      onChange?.(colorValue)
    }

    return (
      <div ref={ref} className={cn("flex flex-wrap gap-2", className)} {...props}>
        {predefinedColors.map((color) => (
          <button
            key={color.value}
            type="button"
            aria-label={`Select ${color.name} color`}
            disabled={disabled}
            className={cn(
              "relative h-8 w-8 rounded-full border border-gray-200 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              value === color.value ? "ring-2 ring-ring ring-offset-2" : "",
              disabled && "opacity-50 cursor-not-allowed hover:scale-100",
            )}
            style={{ backgroundColor: color.value }}
            onClick={() => {
              handleColorChange(color.value)
              onBlur?.()
            }}
          >
            {value === color.value && (
              <Check
                className={cn(
                  "absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2",
                  ["#ef4444", "#f97316", "#a855f7", "#6366f1", "#3b82f6"].includes(color.value)
                    ? "text-white"
                    : "text-black",
                )}
              />
            )}
          </button>
        ))}
      </div>
    )
  },
)

ColorPicker.displayName = "ColorPicker"

