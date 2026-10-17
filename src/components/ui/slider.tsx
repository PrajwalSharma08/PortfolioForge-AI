"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type SliderProps = React.InputHTMLAttributes<HTMLInputElement>

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, ...props }, ref) => (
    <input
      type="range"
      ref={ref}
      className={cn(
        "w-full h-2 bg-muted appearance-none rounded-lg accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary",
        className
      )}
      {...props}
    />
  )
)
Slider.displayName = "Slider"

export { Slider }