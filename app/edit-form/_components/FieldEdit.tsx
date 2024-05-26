import { Edit, Trash } from 'lucide-react'
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
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


const FieldEdit = ({ defaultValue, onUpdate, onDeleteFormField }: { defaultValue: any, onUpdate: (value: any) => void, onDeleteFormField:()=>any }) => {
    const [label, setLabel] = useState<string>(defaultValue?.fieldLabel);
    const [placeholder, setPlaceholder] = useState<string>(defaultValue?.placeholder);

    console.log("p", defaultValue);

    return (
        <div className='flex gap-2'>
            <Popover>
                <PopoverTrigger><Edit className='w-3.5 h-3.5 text-gray-500 cursor-pointer' /></PopoverTrigger>
                <PopoverContent>
                    <h2>Edit Fields</h2>
                    <div>
                        <Label htmlFor="label" className='text-xs text-gray-500'>Label Name</Label>
                        <Input
                            className='mt-1 w-full'
                            id="label"
                            type="text"
                            placeholder="Enter your Label Name"
                            onChange={(e) => setLabel(e.target.value)}
                            value={label == "" ? defaultValue?.fieldLabel : label}
                        />
                    </div>
                    <div className='mt-3'>
                        <Label htmlFor="placeholder" className='text-xs text-gray-500'>Placeholder Name</Label>
                        <Input
                            className='mt-1 w-full focus-visible:ring-2 focus-visible:ring-primary'
                            id="placeholder"
                            type="text"
                            placeholder="Enter your Placeholder Name"
                            onChange={(e) => setPlaceholder(e.target.value)}
                            value={placeholder == "" ? defaultValue?.placeholder : placeholder}
                        />
                    </div>
                    <Button size="sm" className='mt-4' onClick={() => onUpdate({ label, placeholder })}>Update</Button>
                </PopoverContent>
            </Popover>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Trash className='w-3.5 h-3.5 text-red-500 cursor-pointer' />
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
                        <AlertDialogAction onClick={onDeleteFormField}>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default FieldEdit
