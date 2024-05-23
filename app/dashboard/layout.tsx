import { SignedIn } from '@clerk/nextjs';
import React from 'react'
import Sidebar from './_components/sidebar';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SignedIn>
      <div>
        <div className='md:w-64 fixed'>
          <Sidebar />
        </div>
        <div className='md:ml-64'>
          {children}
        </div>
      </div>
    </SignedIn>
  )
}

export default DashboardLayout;