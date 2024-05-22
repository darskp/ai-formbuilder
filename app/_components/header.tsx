import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'

const Header = () => {
    return (
        <div className='p-5 border-b shadow-sm'>
            <div className='flex items-center justify-between'>
                <Image
                    width={180}
                    height={50}
                    alt='logo'
                    src="/logo.svg"
                />
                <Button>Get Started</Button>
            </div>
        </div>
    )
}

export default Header;