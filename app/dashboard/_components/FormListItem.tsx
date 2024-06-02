"use client"
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit, Share, Trash } from 'lucide-react'
import { RWebShare } from "react-web-share";
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { toast } from 'sonner';
import { jsonForms } from '@/config/schema';
import { and, eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { db } from '@/config';

const FormListItem = ({ item, refreshData }: { item: any, refreshData: () => void }) => {
    const { user } = useUser();

    const onDeleteForm = async (item:any) => {
        if (user) {
            const result = await db.delete(jsonForms)
                .where(and(eq(jsonForms.id, item?.id),
                    eq(item?.createdBy, user?.primaryEmailAddress?.emailAddress)))
            if (result) {
                toast('Form Deleted!!!');
                refreshData()
            }
        }
    }
    return (
        <div key={item?.id} className='border shadow-sm rounded-lg p-4'>
            <div className='flex justify-between'>
                <h2></h2>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Trash className='h-5 w-5 text-red-600 
                    cursor-pointer hover:scale-105 transition-all'
                        />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDeleteForm(item)}>Confirm</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <h2 className='text-lg text-black'>{item?.jsonForm?.formTitle}</h2>
            <h2 className='text-sm text-gray-500'>{item?.jsonForm?.formSubheading}</h2>
            <hr className='my-4'></hr>
            <div className='flex justify-between'>
                <RWebShare
                    data={{
                        text: item?.jsonForm?.formTitle + " , Build your form in seconds with AI form Builder ",
                        url: `example.com/edit-form/${item?.id}`,
                        title: item?.jsonForm?.formTitle
                    }}
                    onClick={() => console.log("shared successfully!")}
                >
                    <Button variant="outline" size="sm" className="flex gap-2"> <Share className='h-5 w-5' /> Share</Button>
                </RWebShare>
                <Link href={'/edit-form/' + item?.id}>
                    <Button className="flex gap-2" size="sm"> <Edit className='h-5 w-5' /> Edit</Button>
                </Link>
            </div>
        </div>
    )
}

export default FormListItem