"use client"
import { borderStyles } from '@/app/_data/borderStyle';
import FormUi from '@/app/edit-form/_components/formUi'
import { db } from '@/config';
import { jsonForms } from '@/config/schema';
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Page = ({ params: { formId } }: { params: { formId: number | undefined } }) => {
    const [record, setRecord] = useState<any>(null);

    const getform = async () => {
        if (formId) {
            const result: {
                id: number;
                jsonForm: string;
                createdBy: string;
                createdAt: string;
                theme?: string,
                gradient?: string | null,
                style?: any,
            }[] = await db.select().from(jsonForms)
                .where(and(eq(jsonForms.id, formId)));
            const transformedData: any = { ...result[0], style: JSON?.parse(result[0]?.style), jsonForm: JSON?.parse(result[0]?.jsonForm) }
            setRecord(transformedData)
        }
    }

    useEffect(() => {
        formId && getform()
    }, [formId])

    return (
        <div className='p-10 flex items-center justify-center' style={{ background: record?.gradient }}>
            <FormUi selectedTheme={record?.theme}
                isEdit={false}
                selectedStyle={record?.style}
                jsonFormData={record?.jsonForm}
                onUpdate={() => { }}
                onDeleteFormField={() => { }}
            />
            <Link href="/">
                <div className='hover:scale-105 fixed gap-2 cursor-pointer bottom-5 left-3 md:left-10  flex justify-center text-xs items-center bg-black text-white px-3 py-1 rounded-full'>
                    <Image
                        width={20}
                        height={10}
                        alt='logo'
                        src="/logowithoutText.svg"
                    />
                    <h5> Build your own AI form</h5>
                </div></Link>
        </div>
    )
}

export default Page;