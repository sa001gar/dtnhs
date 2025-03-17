
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-school-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            "focus-within:border-school-primary",
            "scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted",
            className
          )}
          ref={ref}
          {...props}
        />
        {/* Decorative clip path elements that appear on focus */}
        <div 
          className="absolute pointer-events-none inset-0 border border-school-primary/0 focus-within:border-school-primary/30 rounded-md transition-colors"
          style={{
            clipPath: "polygon(0 0, 15px 0, 0 15px)",
          }}
        ></div>
        <div 
          className="absolute pointer-events-none inset-0 border border-school-primary/0 focus-within:border-school-primary/30 rounded-md transition-colors"
          style={{
            clipPath: "polygon(calc(100% - 15px) 0, 100% 0, 100% 15px)",
          }}
        ></div>
        <div 
          className="absolute pointer-events-none inset-0 border border-school-primary/0 focus-within:border-school-primary/30 rounded-md transition-colors"
          style={{
            clipPath: "polygon(0 calc(100% - 15px), 0 100%, 15px 100%)",
          }}
        ></div>
        <div 
          className="absolute pointer-events-none inset-0 border border-school-primary/0 focus-within:border-school-primary/30 rounded-md transition-colors"
          style={{
            clipPath: "polygon(calc(100% - 15px) 100%, 100% 100%, 100% calc(100% - 15px))",
          }}
        ></div>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
