import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from "@/lib/utils"
import { LucideIcon } from 'lucide-react'



interface MenuHeaderProps {
    title: string,
    icon: any
    className?: string
}

export function MenuHeader({
    className,
    title,
    icon: Icon,
    ...props
}: MenuHeaderProps) {
    return (
        <header className={cn(className, '')} {...props}>
            <h1 className='flex items-center gap-2 font-bold text-lg'>
                <span className="bg-blue-600 p-2 rounded-full">
                    <Icon className="w-6 h-6 text-white" />
                </span>
                {title}
            </h1>
        </header>
    )
}