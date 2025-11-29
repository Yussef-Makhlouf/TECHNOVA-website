"use client"

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export function LanguageSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const switchLocale = (newLocale: string) => {
        // Remove current locale from pathname
        const segments = pathname.split('/')
        segments[1] = newLocale
        const newPath = segments.join('/')

        router.push(newPath)
    }

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    ]

    const currentLanguage = languages.find(lang => lang.code === locale)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9 rounded-full border border-[#00D9FF]/30 hover:bg-[#00D9FF]/10 transition-colors"
                >
                    <Globe className="h-4 w-4 text-[#00D9FF]" />
                    <span className="sr-only">Switch language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-panel min-w-[150px]">
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => switchLocale(language.code)}
                        className={`cursor-pointer flex items-center gap-2 ${locale === language.code ? 'bg-[#00D9FF]/10' : ''
                            }`}
                    >
                        <span className="text-lg">{language.flag}</span>
                        <span className="font-medium">{language.name}</span>
                        {locale === language.code && (
                            <span className="ml-auto text-[#00D9FF]">✓</span>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
