"use client"

import Marquee from "react-fast-marquee"
import { useTranslations } from 'next-intl'

export default function LogosMarquee() {
    const t = useTranslations('logosMarquee')
    const logos = [
        "/meta.png",
        "/open-ai.svg",
        "/logixi.png",
        "/github-mark-white.png",
        "/microsoft_logo.svg",
        "/gemini.svg",
        "/cloudflare_Logo.svg",
        // "/yussef_dev.png",
        "/aws.svg",
        "/yussef.png",
    ]

    return (
        <section className="py-16 lg:py-20 relative overflow-hidden" dir="ltr">
            <div className="absolute inset-0 " />

            <div className="container mx-auto px-4 lg:px-8 relative z-10 mb-12">
                <div className="text-center">
                    <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-3">
                        {t('title')}
                    </h2>
                    <div className="gradient-line w-24 mx-auto my-4" />
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </div>
            </div>

            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

                <Marquee
                    gradient={false}
                    speed={40}
                    pauseOnHover={true}
                    className="py-8"
                >
                    {logos.map((logo, index) => (
                        <div
                            key={index}
                            className="mx-8 lg:mx-12 flex items-center justify-center group"
                        >
                            <div className="relative w-32 h-16 lg:w-40 lg:h-20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#7B3FEF]/10 to-[#00D9FF]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                                <img
                                    src={logo}
                                    alt={`Partner logo ${index + 1}`}
                                    className="relative w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                                    style={{
                                        filter: "brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    )
}
