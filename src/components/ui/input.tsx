
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-school-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors",
            "focus-within:border-school-primary",
            className
          )}
          ref={ref}
          {...props}
        />
        {/* Decorative clip path element that appears on focus */}
        <div 
          className="absolute pointer-events-none inset-0 border border-school-primary/0 focus-within:border-school-primary/30 rounded-md transition-colors"
          style={{
            clipPath: "polygon(0 0, 10px 0, 0 10px)",
          }}
        ></div>
        <div 
          className="absolute pointer-events-none inset-0 border border-school-primary/0 focus-within:border-school-primary/30 rounded-md transition-colors"
          style={{
            clipPath: "polygon(calc(100% - 10px) 0, 100% 0, 100% 10px)",
          }}
        ></div>
        <div 
          className="absolute pointer-events-none inset-0 border border-school-primary/0 focus-within:border-school-primary/30 rounded-md transition-colors"
          style={{
            clipPath: "polygon(0 calc(100% - 10px), 0 100%, 10px 100%)",
          }}
        ></div>
        <div 
          className="absolute pointer-events-none inset-0 border border-school-primary/0 focus-within:border-school-primary/30 rounded-md transition-colors"
          style={{
            clipPath: "polygon(calc(100% - 10px) 100%, 100% 100%, 100% calc(100% - 10px))",
          }}
        ></div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
