"use client"
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react'

const Header = () => {
    const { isSignedIn, user, isLoaded } = useUser();

    return (
        <div className='p-5 border-b shadow-sm'>
            <div className='flex items-center justify-between'>
                <Image
                    width={180}
                    height={50}
                    alt='logo'
                    src="/logo.svg"
                />{isSignedIn ?
                    <div className='flex items-center gap-5'>
                        <Button variant='outline'>Dashabord</Button>
                        <UserButton />
                    </div>
                    :
                    <Button>Get Started</Button>
                }
            </div>
        </div>
    )
}

export default Header;