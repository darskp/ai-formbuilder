import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import themes from '@/app/_data/themes'
import { gradients } from '@/app/_data/bgGradients'
import { Button } from '@/components/ui/button'

const Controller = ({ selectedTheme, selectedGradient }: { selectedTheme: (value: string) => void, selectedGradient: (value: string) => void }) => {
    const [showMore, setShowMore] = useState<any>(8)

    return (
        <div>
            <h2 className='mb-3'>Select Themes</h2>
            <Select onValueChange={(value) => selectedTheme(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    {themes?.map((theme: any, index: number) => (
                        <SelectItem value={theme.name} key={index}>
                            <div className='flex gap-2'>
                                <div className='flex'>
                                    <div className='h-5 w-5 rounded-l-lg' style={{ backgroundColor: theme.primary }}></div>
                                    <div className='h-5 w-5' style={{ backgroundColor: theme.secondary }}></div>
                                    <div className='h-5 w-5' style={{ backgroundColor: theme.accent }}></div>
                                    <div className='h-5 w-5 rounded-r-lg' style={{ backgroundColor: theme.neutral }}></div>
                                </div>
                                <div>{theme.name}</div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <h2 className='mt-8 mb-3'>Background</h2>
            <div className='grid grid-cols-3 gap-5'>
                {gradients?.slice(0, showMore)?.map((bg: any, index: number) => (
                    <div onClick={()=>selectedGradient(bg.gradient)} key={bg.name} className='w-full h-[70px] flex items-center justify-center cursor-pointer hover:border-2 hover:border-black rounded-lg' style={{ background: bg.gradient }}>
                        {index === 0 && "none"}
                    </div>)
                )}
            </div>
            <Button variant="ghost" size="sm" className='w-full my-1' onClick={() => setShowMore(showMore <= 8 ? 16: 8 )}>
                {showMore <= 8 ? "Show More" : "Show Less"}
            </Button>

        </div >
    )
}

export default Controller