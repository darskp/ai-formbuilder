"use client"
import { Button } from '@/components/ui/button';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Header: React.FC = () => {
    const { isSignedIn } = useUser();
    const [signedIn, setsignedIn] = useState<any>(isSignedIn)
    const pathName = usePathname()

    useEffect(() => {
        if (isSignedIn) {
            setsignedIn(isSignedIn)
        }
    }, [isSignedIn])

    return !pathName.includes('/aiform') &&
        <div className='p-5 border-b shadow-sm'>
            <div className='flex items-center justify-between'>
                <Image
                    width={180}
                    height={50}
                    alt='logo'
                    src="/logo.svg"
                />{signedIn ?
                    <div className='flex items-center gap-5'>
                        <Link href="/dashboard">
                            <Button variant='outline'>Dashboard</Button>
                        </Link>
                        <UserButton />
                    </div>
                    :
                    <SignInButton>
                        <Button> Get Started</Button>
                    </SignInButton>
                }
            </div>
        </div>
}

export default Header;