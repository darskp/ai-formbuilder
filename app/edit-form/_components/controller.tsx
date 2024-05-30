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
import { borderStyles } from '@/app/_data/borderStyle'
import Image from 'next/image'
import { sortByKey } from '@/util/util'

const Controller = ({ selectedStyle, selectedThemeUpdate, selectedTheme, selectedGradient, selectedGradientUpdate, selectedStyleUpdate }: { selectedStyle: any, selectedTheme: string, selectedGradient: string, selectedThemeUpdate: (value: string) => void, selectedGradientUpdate: (value: string) => void, selectedStyleUpdate: (styleProp: any) => void }) => {
    const [showMore, setShowMore] = useState<any>(8)

    return (
        <div>
            <h2 className='mb-3'>Select Themes</h2>
            <Select onValueChange={(value) => selectedThemeUpdate(value)} value={selectedTheme == " " ? "Theme" : selectedTheme}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    {sortByKey(themes, "name").map((theme: any, index: number) => (
                        <SelectItem value={theme?.name} key={index}>
                            <div className='flex gap-2'>
                                <div className='flex'>
                                    <div className='h-5 w-5 rounded-l-lg' style={{ backgroundColor: theme?.primary }}></div>
                                    <div className='h-5 w-5' style={{ backgroundColor: theme?.secondary }}></div>
                                    <div className='h-5 w-5' style={{ backgroundColor: theme?.accent }}></div>
                                    <div className='h-5 w-5 rounded-r-lg' style={{ backgroundColor: theme?.neutral }}></div>
                                </div>
                                <div>{theme?.name}</div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <h2 className='mt-8 mb-3'>Background</h2>
            <div className='grid grid-cols-3 gap-5'>
                {gradients?.slice(0, showMore)?.map((bg: any, index: number) => (
                    <div onClick={() => selectedGradientUpdate(bg.gradient)} key={bg.name} className={`w-full h-[70px] flex items-center justify-center cursor-pointer hover:border-2 hover:border-black rounded-lg ${selectedGradient === bg.gradient ? 'border-2 border-black' : ''}`} style={{ background: bg.gradient }}>
                        {index === 0 && "none"}
                    </div>)
                )}
            </div>
            <Button variant="ghost" size="sm" className='w-full my-1' onClick={() => setShowMore(showMore <= 8 ? 16 : 8)}>
                {showMore <= 8 ? "Show More" : "Show Less"}
            </Button>
            <h2 className='mt-8 mb-3'>Style</h2>
            <div className='grid grid-cols-3 gap-5'>
                {borderStyles?.map((item: any, index: number) => (
                    <div key={item?.id}>
                        <div onClick={() => selectedStyleUpdate(item)}>
                            <Image
                                className={`rounded-lg cursor-pointer hover:border-2 hover:border-black ${selectedStyle?.name === item?.name && 'border-2 border-black'}`}
                                width={600}
                                height={80}
                                objectFit='fill'
                                src={item?.img}
                                alt={item?.name}
                            />
                        </div>
                        <h2 className='text-sm text-center my-2'>{item?.name}</h2>
                    </div>
                )
                )}
            </div>
        </div >
    )
}

export default Controller