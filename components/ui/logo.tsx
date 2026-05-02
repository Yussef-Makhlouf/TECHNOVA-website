import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"

interface LogoProps {
    className?: string
    showText?: boolean
    size?: "sm" | "md" | "lg"
    href?: string
}

export function Logo({ className, showText = true, size = "md", href = "/" }: LogoProps) {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-16 h-16",
    }

    const textClasses = {
        sm: "text-lg",
        md: "text-xl",
        lg: "text-3xl",
    }

    const Content = () => (
        <div className={cn("flex items-center gap-2 group", className)}>
            <div className={cn("relative transition-transform group-hover:scale-110", sizeClasses[size])}>
                <img
                    src="/logos/logo-12.svg"
                    alt="TECHNOVA Logo"
                    className="w-full h-full object-contain"
                />
            </div>
            {showText && (
                <span className={cn("font-heading font-bold text-foreground tracking-wider", textClasses[size])}>
                    TECHNOVA
                </span>
            )}
        </div>
    )

    if (href) {
        return (
            <Link href={href} className="inline-block">
                <Content />
            </Link>
        )
    }

    return <Content />
}
