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
import { borderStyles } from '@/app/_data/borderStyle';

const prompt: string = `Based on the provided description, generate a JSON object for a form. 
The JSON object should include the following fields: formTitle, formSubheading, and formFields. 
Each formField should have fieldName, placeholder, fieldLabel, fieldType, and isRequired, and at the end, 
a checkbox for agreeing to terms should be included. 
Provide only the JSON object without any additional explanation. 
For all fieldTypes, placeholder is required, and if the fieldType is radio or select, provide options as an array of strings. 
Maximize the number of related form fields based on the description.`;

const CreateForm = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [userInput, setUserInput] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const { user } = useUser();
    const router: AppRouterInstance = useRouter();

    const handleFormInput = async () => {
        setLoading(true)
        const result: any = await chatSession.sendMessage(`description ${userInput} ${prompt}`);
        const createdBy = user?.primaryEmailAddress?.emailAddress;
        let jsonResponse = result?.response?.text();

        if (jsonResponse && createdBy) {
            jsonResponse = jsonResponse.replace(/```json|```/g, '').trim();
            setLoading(false);

            const response = await db.insert(jsonForms).values({
                createdAt: moment().format(),
                createdBy: createdBy,
                jsonForm: JSON.stringify(jsonResponse),
                theme: '',
                gradient: '',
                style: null
            }).returning({ id: jsonForms.id })
            router.push(`/edit-form/${response[0].id}`)
        }
    }

    return (
        <div>
            <Button onClick={() => setOpen(true)}>+ Create Form</Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new Form</DialogTitle>
                        <DialogDescription>
                            <Textarea className='my-2'
                                placeholder="Write Description of your form"
                                onChange={(e) => setUserInput(e.target.value)}
                                value={userInput}
                            />
                            <div className='flex gap-2 mt-4 mb-0 justify-end'>
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