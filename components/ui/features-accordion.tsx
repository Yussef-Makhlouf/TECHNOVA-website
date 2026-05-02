'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ChartBarIncreasingIcon, Database, Fingerprint, IdCard } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BorderBeam } from '@/components/magicui/border-beam'
import { useTranslations, useLocale } from 'next-intl'

export default function FeaturesAccordion() {
    const t = useTranslations('featuresAccordion')
    const locale = useLocale()
    const isRtl = locale === 'ar'

    type ImageKey = 'item-1' | 'item-2' | 'item-3' | 'item-4'
    const [activeItem, setActiveItem] = useState<ImageKey>('item-1')

    const images = {
        'item-1': {
            image: '/crypto-exchange-ui.jpg',
            alt: 'Database visualization',
        },
        'item-2': {
            image: '/crypto-exchange-ui.jpg',
            alt: 'Security authentication',
        },
        'item-3': {
            image: '/crypto-exchange-ui.jpg',
            alt: 'Identity management',
        },
        'item-4': {
            image: '/crypto-exchange-ui.jpg',
            alt: 'Analytics dashboard',
        },
    }

    const accordionItems = [
        {
            id: 'item-1',
            icon: Database,
            title: t('items.database.title'),
            description: t('items.database.description'),
        },
        {
            id: 'item-2',
            icon: Fingerprint,
            title: t('items.authentication.title'),
            description: t('items.authentication.description'),
        },
        {
            id: 'item-3',
            icon: IdCard,
            title: t('items.identity.title'),
            description: t('items.identity.description'),
        },
        {
            id: 'item-4',
            icon: ChartBarIncreasingIcon,
            title: t('items.analytics.title'),
            description: t('items.analytics.description'),
        },
    ]

    return (
        <section className="py-16 md:py-28 lg:py-40">
            <div className="mx-auto max-w-7xl space-y-12 px-6 md:space-y-20 lg:space-y-28">
                <div className="relative z-10 mx-auto max-w-3xl space-y-8 text-center">
                    <h2 className="text-balance text-5xl font-semibold md:text-6xl lg:text-7xl font-heading text-foreground">
                        {t('title')}
                    </h2>
                    <p className="text-muted-foreground text-xl md:text-2xl">
                        {t('description')}
                    </p>
                </div>

                <div className={`grid gap-12 sm:px-12 md:grid-cols-2 lg:gap-24 lg:px-0 ${isRtl ? 'md:grid-flow-col-dense' : ''}`}>
                    <Accordion
                        type="single"
                        value={activeItem}
                        onValueChange={(value) => setActiveItem(value as ImageKey)}
                        className="w-full"
                    >
                        {accordionItems.map((item) => (
                            <AccordionItem key={item.id} value={item.id}>
                                <AccordionTrigger>
                                    <div className="flex items-center gap-3 text-lg md:text-xl">
                                        <item.icon className="size-5 md:size-6 text-[#7B3FEF]" />
                                        {item.title}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base md:text-lg">
                                    {item.description}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="bg-background relative flex overflow-hidden rounded-3xl border border-border p-3 md:p-4 min-h-[400px] md:min-h-[400px] lg:min-h-[450px]">
                        <div className="w-20 absolute inset-0 right-0 ml-auto border-l border-border bg-[repeating-linear-gradient(-45deg,var(--border),var(--border)_1px,transparent_1px,transparent_8px)]"></div>
                        <div className="aspect-[76/59] bg-background relative w-[calc(3/4*100%+4rem)] rounded-2xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${activeItem}-id`}
                                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    className="size-full overflow-hidden rounded-2xl border border-border bg-card shadow-md"
                                >
                                    <Image
                                        src={images[activeItem].image}
                                        className="size-full object-cover object-left-top"
                                        alt={images[activeItem].alt}
                                        width={1207}
                                        height={929}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <BorderBeam
                            duration={6}
                            size={200}
                            colorFrom="#7B3FEF"
                            colorTo="#00D9FF"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
