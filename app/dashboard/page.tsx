import React from 'react'
import CreateForm from './_components/createForm'

const Dashboard = (): JSX.Element => {
  return (
    <div className='p-5'>
      <h2 className='flex items-center text-2xl justify-between font-bold'>Dashboard <CreateForm/>
      </h2>
    </div>
  )
}

export default Dashboard