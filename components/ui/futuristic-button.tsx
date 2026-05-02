"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                futuristic: "bg-background border border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary"
            },
            size: {
                default: "h-12 px-8 py-3", // Slightly larger for the clipped effect
                sm: "h-9 px-4 text-xs",
                lg: "h-14 px-10 text-base",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "futuristic",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    cutSize?: string
}

const FuturisticButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, cutSize = "1rem", style, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        // Only apply clip-path if it's not a link/ghost/simple variant effectively, 
        // but for "futuristic" we definitely want it.
        // For now, applying to all except maybe link/ghost if requested, 
        // but the task said "make buttons too have same border".

        const clipStyle = {
            clipPath: `polygon(
            0 0, 
            100% 0, 
            100% calc(100% - ${cutSize}), 
            calc(100% - ${cutSize}) 100%, 
            0 100%
        )`,
            ...style
        }

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                style={clipStyle}
                {...props}
            >
                {props.children}

                {/* Decorative corner line for the cut */}
                <span
                    className="absolute bottom-0 right-0 w-4 h-[1px] bg-current opacity-50 rotate-[-45deg] origin-bottom-right translate-y-[-0.5px] translate-x-[-0.5px]"
                    style={{ width: `calc(${cutSize} * 1.414)` }} // approx sqrt(2)
                />
            </Comp>
        )
    }
)
FuturisticButton.displayName = "FuturisticButton"

export { FuturisticButton, buttonVariants }
