"use client"
import React from 'react';
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/config/aiModal';
import { Loader2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { jsonForms } from '@/config/schema';
import { db } from '@/config';
import moment from 'moment';

const prompt: string = "On the basis of description please give form in json format with form title, from subheading with form having form field, form name, placeholder name, and form label, fieldType, field required in json format, note: GIVE ME ONLY JSON FORMAT NO EXAPLNATION NOTHING"
const CreateForm = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [userInput, setUserInput] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const { user } = useUser();
    const router: AppRouterInstance = useRouter();

    const handleFormInput = async () => {
        setLoading(true)
        const result: any = await chatSession.sendMessage(`description ${userInput} ${prompt}`);
        console.log(result.response.text());
        const createdBy = user?.primaryEmailAddress?.emailAddress;
        if (result.response.text() && createdBy) {
            setLoading(false)
            const response = await db.insert(jsonForms).values({
                createdAt: moment().format('DD/MM/YYYY'),
                createdBy: createdBy,
                jsonForm: result.response.text()
            }).returning({id:jsonForms.id})
            // 
            console.log("response", response);
            router.push(`/edit-form/${response[0].id}`)
        }

    }

    return (
        <div>
            <Button onClick={() => setOpen(true)}>+ Create Form</Button>
            <Dialog open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new Form</DialogTitle>
                        <DialogDescription>
                            <Textarea className='my-2'
                                placeholder="Write Description of your form"
                                onChange={(e) => setUserInput(e.target.value)}
                                value={userInput}
                            />
                            <div className='flex gap-2 my-3 justify-end'>
                                <Button onClick={() => setOpen(false)} variant="destructive">Cancel</Button>
                                <Button onClick={() => handleFormInput()} disabled={loading}>{loading ? <Loader2 className='animate-spin' /> : "Create"}</Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateForm