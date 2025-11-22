"use client"

import React from "react"

const logos = [
    "/logos/logo-1.svg",
    "/logos/logo-2.svg",
    "/logos/logo-3.svg",
    "/logos/logo-4.svg",
    "/logos/logo-5.svg",
    "/logos/logo-6.svg",
    "/logos/logo-7.svg",
    "/logos/logo-8.svg",
    "/logos/logo-9.svg",
    "/logos/logo-10.svg",
    "/logos/logo-11.svg",
    "/logos/logo-13.svg",
    "/logos/logo-14.svg",
    "/logos/logo-15.svg",
    "/logos/logo-16.svg",
]

export function PartnersMarquee() {
    // Inject keyframes for the marquee animation
    React.useEffect(() => {
        const styleSheet = document.createElement("style")
        styleSheet.innerText = `
      @keyframes marquee-move {
        to {
          transform: translateX(calc(-100cqw - var(--item-gap)));
        }
      }
      @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
    `
        document.head.appendChild(styleSheet)
        return () => {
            document.head.removeChild(styleSheet)
        }
    }, [])

    const Marquee = ({ items, direction = "forwards" }: { items: string[]; direction?: string }) => {
        const numItems = items.length
        const speed = "40s"
        const itemWidth = "200px"
        const itemGap = "40px"

        return (
            <div
                className="w-full overflow-hidden relative py-10"
                style={{
                    "--speed": speed,
                    "--numItems": numItems,
                    "--item-width": itemWidth,
                    "--item-gap": itemGap,
                    "--direction": direction,
                    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                } as React.CSSProperties}
            >
                <div
                    className="w-max flex items-center"
                    style={{
                        "--track-width": `calc(var(--item-width) * ${numItems})`,
                        "--track-gap": `calc(var(--item-gap) * ${numItems})`,
                    } as React.CSSProperties}
                >
                    {[...items, ...items].map((logo, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 flex justify-center items-center transition-all duration-300 group"
                            style={{
                                width: "var(--item-width)",
                                height: "100px",
                                marginRight: "var(--item-gap)",
                                animation: `marquee-move var(--speed) linear infinite ${direction}`,
                            } as React.CSSProperties}
                        >
                            <img
                                src={logo}
                                alt={`Partner logo ${index}`}
                                className="max-w-[85%] max-h-[85%] object-contain opacity-50 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0 dark:invert group-hover:drop-shadow-[0_0_8px_rgba(123,63,239,0.8)]"
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <section className="relative py-20 overflow-hidden bg-background border-t border-border">
            {/* Universe Background Effects (Dark Mode Only) */}
            <div className="absolute inset-0 z-0 hidden dark:block">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1d2d] via-[#030712] to-[#030712]" />

                {/* Stars */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            opacity: Math.random() * 0.7 + 0.3,
                            animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`,
                        }}
                    />
                ))}

                {/* Nebula glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B3FEF]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[100px]" />
            </div>

            {/* Light Mode Background */}
            <div className="absolute inset-0 z-0 block dark:hidden bg-gradient-to-b from-white to-gray-50/50" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF]">Universe</span> Leaders
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Collaborating with visionary companies across the galaxy to build the future.
                    </p>
                </div>

                <Marquee items={logos} />
            </div>
        </section>
    )
}
