"use client"
import { db } from '@/config';
import { jsonForms } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { and, desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import FormListItem from './FormListItem';

const FormList = () => {
  const [formLists, setFormLists] = useState<any>(null);
  const { user } = useUser();

  const GetFormList = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      const result: {
        id: number;
        jsonForm: string;
        createdBy: string;
        createdAt?: string;
        theme?: string,
        gradient?: string | null,
        style?: any,
      }[] = await db.select({
        id: jsonForms.id,
        jsonForm: jsonForms.jsonForm,
        createdBy: jsonForms.createdBy
      }).from(jsonForms)
        .where(eq(jsonForms?.createdBy,
          user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(jsonForms.id));

      if (result) {
        const data = result.map((item: any) => (
          { ...item, jsonForm: JSON.parse(item?.jsonForm) }
        ))
        console.log(data)
        setFormLists(data)
      }
    }
  }

  useEffect(() => {
    user && GetFormList()
  }, [user])

  return (
    <div className='mt-5 grid grid-cols-2 md:grid-cols-3 gap-5'>
      {
        formLists?.map((item: any) => {
          return (<FormListItem item={item} refreshData={GetFormList} />)
        })
      }</div>
  )
}

export default FormList