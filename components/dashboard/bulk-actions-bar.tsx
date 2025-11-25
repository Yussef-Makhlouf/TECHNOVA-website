"use client"

import { Trash, Archive, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface BulkActionsBarProps {
    selectedCount: number
    onClearSelection: () => void
    onDelete: () => void
    onArchive?: () => void
    onPublish?: () => void
}

export function BulkActionsBar({
    selectedCount,
    onClearSelection,
    onDelete,
    onArchive,
    onPublish,
}: BulkActionsBarProps) {
    return (
        <AnimatePresence>
            {selectedCount > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-auto max-w-2xl"
                >
                    <div className="bg-primary text-primary-foreground shadow-2xl rounded-xl border border-primary/20 p-4 backdrop-blur-sm">
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary-foreground/20 rounded-full px-4 py-1.5">
                                    <span className="font-semibold text-sm">
                                        {selectedCount} {selectedCount === 1 ? "item" : "items"} selected
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {onPublish && (
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={onPublish}
                                        className="gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20"
                                    >
                                        <Check className="h-4 w-4" />
                                        Publish
                                    </Button>
                                )}

                                {onArchive && (
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={onArchive}
                                        className="gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20"
                                    >
                                        <Archive className="h-4 w-4" />
                                        Archive
                                    </Button>
                                )}

                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={onDelete}
                                    className="gap-2"
                                >
                                    <Trash className="h-4 w-4" />
                                    Delete
                                </Button>

                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={onClearSelection}
                                    className="gap-2 hover:bg-primary-foreground/10 text-primary-foreground"
                                >
                                    <X className="h-4 w-4" />
                                    Clear
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
