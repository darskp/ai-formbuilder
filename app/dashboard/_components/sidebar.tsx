"use client"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { menuList } from '@/util/util'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Sidebar = (): JSX.Element => {
    const path = usePathname();
    useEffect(() => {
        console.log(path);
    }, [path])

    return (
        <div className='h-screen shadow-md border-r'>
            <div className='p-4'>
                {menuList.map((menu, index, arr) =>
                    <h2 key={menu.id}
                        className={`flex items-center gap-3 text-gray-500
                    p-4 mb-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${path == menu.path && `bg-primary text-white`}`}>
                        <menu.icon />
                        {menu.name}
                    </h2>
                )}
            </div>
            <div className='fixed w-64 bottom-1 p-4'>
                <Button className='w-full'>+ Create Form</Button>
                <div className='mt-7 mb-2'>
                    <Progress value={33} />
                </div>
                <h2 className='text-sm ml-1 mt-1 text-gray-600'><strong>2 </strong>out of <strong>3</strong> File Created</h2>
                <h2 className='text-xs ml-1 mt-1 text-gray-600'>Upgrade your plan for unlimited AI Form build</h2>
            </div>
        </div>
    )
}

export default Sidebar;