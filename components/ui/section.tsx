import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export const Section = ({ children, className, ...props }: SectionProps) => {
  return (
    <section className={cn("relative py-20 lg:py-32", className)} {...props}>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">{children}</div>
    </section>
  )
}
