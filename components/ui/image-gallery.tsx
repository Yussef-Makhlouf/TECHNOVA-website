'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Event media for your team
const eventImages = [
    { src: '/event.jpeg', alt: 'Team Event', isPortrait: true },
    { src: '/event1.jpeg', alt: 'Team Event', isPortrait: true },
    { src: '/videos/event-video.mp4', alt: 'Event Video', isVideo: true, isPortrait: true },
    { src: '/event3.jpeg', alt: 'Team Event', isPortrait: false },
    { src: '/event4.jpeg', alt: 'Team Event', isPortrait: false },
    { src: '/event5.jpeg', alt: 'Team Event', isPortrait: false },
];

export function ImageGallery() {
    // Distribute images across 3 columns
    const columns = [
        [eventImages[0], eventImages[3]], // Column 1: portrait + landscape
        [eventImages[1], eventImages[4]], // Column 2: portrait + landscape
        [eventImages[2], eventImages[5]], // Column 3: video + landscape
    ];

    return (
        <div className="relative flex w-full flex-col items-center justify-center">
            <div className="mx-auto grid w-full max-w-6xl gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {columns.map((columnImages, col) => (
                    <div key={col} className="grid gap-4 sm:gap-5 lg:gap-6">
                        {columnImages.map((image, index) => {
                            const ratio = image.isPortrait ? 9 / 16 : 16 / 9;

                            if (image.isVideo) {
                                return (
                                    <AnimatedVideo
                                        key={`${col}-${index}`}
                                        src={image.src}
                                        ratio={ratio}
                                    />
                                );
                            }

                            return (
                                <AnimatedImage
                                    key={`${col}-${index}`}
                                    alt={image.alt}
                                    src={image.src}
                                    ratio={ratio}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

interface AnimatedImageProps {
    alt: string;
    src: string;
    className?: string;
    ratio: number;
}

function AnimatedImage({ alt, src, ratio }: AnimatedImageProps) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    const [isLoading, setIsLoading] = React.useState(true);

    return (
        <AspectRatio
            ref={ref}
            ratio={ratio}
            className="bg-accent/10 relative size-full rounded-2xl border border-white/10 overflow-hidden group cursor-pointer"
        >
            <img
                alt={alt}
                src={src}
                className={cn(
                    'size-full rounded-2xl object-cover opacity-0 transition-all duration-1000 ease-in-out group-hover:scale-105',
                    {
                        'opacity-100': isInView && !isLoading,
                    },
                )}
                onLoad={() => setIsLoading(false)}
                loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl" />
        </AspectRatio>
    );
}

interface AnimatedVideoProps {
    src: string;
    ratio: number;
}

function AnimatedVideo({ src, ratio }: AnimatedVideoProps) {
    const ref = React.useRef<HTMLVideoElement>(null);
    const containerRef = React.useRef(null);
    const isInView = useInView(containerRef, { once: true });
    const [isLoading, setIsLoading] = React.useState(true);

    return (
        <AspectRatio
            ref={containerRef}
            ratio={ratio}
            className="bg-accent/10 relative size-full rounded-2xl border border-white/10 overflow-hidden group cursor-pointer"
        >
            <video
                ref={ref}
                src={src}
                className={cn(
                    'size-full rounded-2xl object-cover opacity-0 transition-all duration-1000 ease-in-out',
                    {
                        'opacity-100': isInView && !isLoading,
                    },
                )}
                onLoadedData={() => setIsLoading(false)}
                loop
                muted
                playsInline
                autoPlay
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl" />
        </AspectRatio>
    );
}

// Default export for backwards compatibility
export default ImageGallery;
