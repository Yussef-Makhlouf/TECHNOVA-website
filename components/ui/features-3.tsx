'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Zap, Shield, Users, Rocket, Brain, Globe } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function Features3() {
    const t = useTranslations('features3')
    return (
        <section className="py-0">
            <div className="mx-auto max-w-3xl lg:max-w-6xl px-6">
                <div className="relative">
                    <div className="relative z-10 grid grid-cols-6 gap-4">
                        {/* Feature 1: End-to-End Solutions */}
                        <Card className="relative col-span-full flex overflow-hidden sm:col-span-3 lg:col-span-2 hover:shadow-lg transition-shadow duration-300 bg-card/30 backdrop-blur-md">
                            <CardContent className="relative m-auto size-fit pt-8 pb-6 px-4">
                                <div className="relative flex items-center justify-center mb-6">
                                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#7B3FEF]/20 to-[#00D9FF]/20 border-2 border-[#7B3FEF]/30">
                                        <Rocket className="h-10 w-10 text-[#7B3FEF]" />
                                    </div>
                                </div>
                                <h2 className="mt-4 text-center text-2xl font-semibold bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] bg-clip-text text-transparent">
                                    {t('endToEnd.title')}
                                </h2>
                                <p className="mt-3 text-center text-foreground/80 text-sm">
                                    {t('endToEnd.description')}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 2: Enterprise-Grade Security */}
                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 hover:shadow-lg transition-shadow duration-300 bg-card/30 backdrop-blur-md">
                            <CardContent className="pt-8 pb-6 px-4">
                                <div className="relative mx-auto flex aspect-square h-20 w-20 rounded-full border-2 border-[#7B3FEF]/30 items-center justify-center">
                                    <Shield className="h-10 w-10 text-[#7B3FEF]" />
                                </div>
                                <div className="relative z-10 mt-6 space-y-2 text-center">
                                    <h2 className="text-2xl font-semibold transition bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] bg-clip-text text-transparent">
                                        {t('enterpriseSecurity.title')}
                                    </h2>
                                    <p className="text-foreground/80 text-sm">
                                        {t('enterpriseSecurity.description')}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Feature 3: Scalable Architecture */}
                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 hover:shadow-lg transition-shadow duration-300 bg-card/30 backdrop-blur-md">
                            <CardContent className="pt-8 pb-6 px-4">
                                <div className="relative mx-auto flex aspect-square h-20 w-20 rounded-full border-2 border-[#7B3FEF]/30 items-center justify-center">
                                    <Zap className="h-10 w-10 text-[#00D9FF]" />
                                </div>
                                <div className="relative z-10 mt-6 space-y-2 text-center">
                                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] bg-clip-text text-transparent">
                                        {t('lightningFast.title')}
                                    </h2>
                                    <p className="text-foreground/80 text-sm">
                                        {t('lightningFast.description')}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Feature 4: AI-Powered Innovation */}
                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-3 hover:shadow-lg transition-shadow duration-300 bg-card/30 backdrop-blur-md">
                            <CardContent className="grid pt-6 sm:grid-cols-2 gap-6">
                                <div className="relative z-10 flex flex-col justify-center space-y-6">
                                    <div className="relative flex aspect-square size-16 rounded-full border-2 border-[#7B3FEF]/30 items-center justify-center">
                                        <Brain className="h-8 w-8 text-[#7B3FEF]" strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] bg-clip-text text-transparent">
                                            {t('aiPowered.title')}
                                        </h2>
                                        <p className="text-foreground/80 text-sm">
                                            {t('aiPowered.description')}
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex items-center justify-center">
                                    <div className="relative w-40 h-40">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7B3FEF]/20 to-[#00D9FF]/20 animate-pulse"></div>
                                        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#7B3FEF]/30 to-[#00D9FF]/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#7B3FEF]/40 to-[#00D9FF]/40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF]"></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Feature 5: Global Expertise */}
                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-3 hover:shadow-lg transition-shadow duration-300 bg-card/30 backdrop-blur-md">
                            <CardContent className="grid h-full pt-6 sm:grid-cols-2 gap-6">
                                <div className="relative z-10 flex flex-col justify-center space-y-6">
                                    <div className="relative flex aspect-square size-16 rounded-full border-2 border-[#7B3FEF]/30 items-center justify-center">
                                        <Users className="h-8 w-8 text-[#00D9FF]" strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] bg-clip-text text-transparent">
                                            {t('expertTeam.title')}
                                        </h2>
                                        <p className="text-foreground/80 text-sm">
                                            {t('expertTeam.description')}
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex items-center justify-center">
                                    <div className="grid grid-cols-3 gap-3">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                            <div
                                                key={i}
                                                className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7B3FEF]/20 to-[#00D9FF]/20 hover:from-[#7B3FEF]/40 hover:to-[#00D9FF]/40 transition-all duration-300 hover:scale-110 border border-[#7B3FEF]/20"
                                                style={{
                                                    animationDelay: `${i * 0.1}s`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Feature 6: Global Reach */}
                        <Card className="relative col-span-full overflow-hidden sm:col-span-6 lg:col-span-6 hover:shadow-lg transition-shadow duration-300 bg-card/30 backdrop-blur-md">
                            <CardContent className="pt-8 pb-6 px-6">
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="relative flex aspect-square h-24 w-24 rounded-full border-2 border-[#7B3FEF]/30 bg-gradient-to-br from-[#7B3FEF]/10 to-[#00D9FF]/10 items-center justify-center flex-shrink-0">
                                        <Globe className="h-12 w-12 text-[#00D9FF]" strokeWidth={1.5} />
                                    </div>
                                    <div className="flex-1 text-center md:text-left space-y-3">
                                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7B3FEF] to-[#00D9FF] bg-clip-text text-transparent">
                                            {t('globalReach.title')}
                                        </h2>
                                        <p className="text-foreground/80 text-base md:text-lg max-w-3xl">
                                            {t('globalReach.description')}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
