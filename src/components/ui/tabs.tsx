import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  // Create a separate ref to forward to Radix UI
  const tabsRef = React.useRef<HTMLDivElement>(null);
  
  // Combine refs
  React.useImperativeHandle(ref, () => tabsRef.current as HTMLDivElement);
  
  return (
    <div className="relative w-full">
      <div className="overflow-x-auto overflow-y-hidden w-full no-scrollbar pb-1">
        <TabsPrimitive.List
          ref={tabsRef}
          className={cn(
            "inline-flex min-w-max items-center justify-start gap-2 rounded-md bg-muted p-1 text-muted-foreground",
            className
          )}
          style={{
            WebkitOverflowScrolling: "touch" // Better iOS momentum scrolling
          }}
          {...props}
        />
      </div>
      
      {/* Fade indicators that show when content is scrollable */}
      <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-background to-transparent opacity-75 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent opacity-75 pointer-events-none" />
    </div>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex min-w-[100px] items-center justify-center whitespace-nowrap rounded-sm px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-school-primary",
      "touch-action-manipulation",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

// Add a global style to your CSS file or component
const GlobalScrollbarStyle = () => (
  <style>{`
    /* Hide scrollbar for Chrome, Safari and Opera */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    
    /* Hide scrollbar for IE, Edge and Firefox */
    .no-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  `}</style>
);

// Use the tabs with a scroll controller
const useScrollableTabs = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Scroll to a specific tab
  const scrollToTab = (tabElement: HTMLElement) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollAmount = tabElement.offsetLeft - 16; // Offset for padding
    
    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };
  
  return { containerRef, scrollToTab };
};

export { Tabs, TabsList, TabsTrigger, TabsContent, useScrollableTabs, GlobalScrollbarStyle }