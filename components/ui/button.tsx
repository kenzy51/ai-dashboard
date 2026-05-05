import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d4ff33] disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-[#d4ff33] text-black hover:bg-[#b8e62d] shadow-[0_0_20px_rgba(212,255,51,0.2)]",
        destructive: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white",
        outline: "border border-white/10 bg-transparent text-zinc-100 hover:bg-white/5 hover:border-white/20",
        secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
        ghost: "text-zinc-400 hover:text-[#d4ff33] hover:bg-white/5",
        link: "text-[#d4ff33] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 rounded-xl text-xs",
        lg: "h-14 px-10 rounded-[20px] text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }