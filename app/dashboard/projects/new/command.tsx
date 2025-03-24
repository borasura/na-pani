import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const Command = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ className, children, ...props }, ref) => (
    <Slot
      ref={ref}
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden rounded-md border text-sm text-popover-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </Slot>
  ),
)
Command.displayName = "Command"

const CommandEmpty = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("py-2 px-3 text-center text-sm text-muted-foreground", className)} {...props}>
      No results found.
    </p>
  ),
)
CommandEmpty.displayName = "CommandEmpty"

const CommandGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("overflow-hidden p-1", className)} {...props} />,
)
CommandGroup.displayName = "CommandGroup"

const CommandItem = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  ),
)
CommandItem.displayName = "CommandItem"

const CommandList = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("max-h-[22rem] overflow-y-auto overflow-x-hidden", className)} {...props} />
  ),
)
CommandList.displayName = "CommandList"

const CommandInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
)
CommandInput.displayName = "CommandInput"

const CommandLoading = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("py-2 px-3 text-center text-sm text-muted-foreground", className)} {...props}>
      Loading...
    </div>
  ),
)
CommandLoading.displayName = "CommandLoading"

export { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandInput, CommandLoading }

// TODO later merge this with components/ui/command.tsx