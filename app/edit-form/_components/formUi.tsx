import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useRef, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import FieldEdit from './FieldEdit';
import { borderStyleType } from '@/lib/types';
import { db } from '@/config';
import moment from 'moment';
import { userResponses } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

type formUiProps = {
    isEdit: Boolean,
    selectedTheme: string,
    jsonFormData: any,
    onUpdate?: any,
    onDeleteFormField?: any,
    selectedStyle: borderStyleType
}

const FormUi = ({ isEdit, selectedTheme, jsonFormData, onUpdate, onDeleteFormField, selectedStyle }: formUiProps) => {
    let formRef: any= useRef()
    const { user } = useUser()
    const [formData, setFormData] = useState<any>(null)

    const onHandleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const onHandleFormSubmit = async (e: any) => {
        e.preventDefault();
        console.log(formData)
        const createdBy = user?.primaryEmailAddress?.emailAddress || "anonymous";
        const response = await db.insert(userResponses).values({
            createdAt: moment().format(),
            createdBy: createdBy,
            formData: JSON.stringify(formData),
        }).returning({ id: userResponses.id })
        console.log("response", response);
        if (response) {
            setFormData(null)
            formRef.current.reset()
            toast("Response submitted successfully!!!")

        }

    }

    const handleSelectChange = (value: string, fieldName: any) => {
        setFormData({ ...formData, [fieldName]: value })
    }

    const handleCheckBox = (fieldName: string, itemName: string, value: string | boolean) => {
        const list: any = formData?.[fieldName] ? formData[fieldName] : []
        if (value) {
            list.push({ label: itemName, value: value });
            setFormData({ ...formData, [fieldName]: list })
        } else {
            const result: any = list?.filter((item: any) => item?.label === itemName)
            setFormData({ ...formData, [fieldName]: result })
        }
    };
    console.log(formData);

    return (
        <form onSubmit={onHandleFormSubmit} ref={formRef} className='border p-5 rounded-lg lg:w-[600px]' data-theme={selectedTheme} style={{ [selectedStyle?.key]: selectedStyle?.value }}>
            <h2 className='font-bold text-center text-2xl'>{jsonFormData?.formTitle}</h2>
            <h2 className='text-sm text-center text-gray-400'>{jsonFormData?.formSubheading}</h2>
            <div>
                {jsonFormData?.formFields?.map((field: any, index: number) => (
                    <div key={index} className='my-3 flex gap-2 items-center'>
                        {field?.fieldType == 'select' ?
                            <div className='w-full'>
                                <Label htmlFor={field?.fieldName} className='text-xs mb-1 text-gray-500'>{field?.fieldLabel}</Label>
                                <div className='mt-1'>
                                    <Select data-theme={selectedTheme} onValueChange={(value) => handleSelectChange(value, field?.fieldName)}>
                                        <SelectTrigger className="w-full bg-transparent placeholder-opacity-25 focus:ring-2 focus:ring-primary">
                                            <SelectValue placeholder={field?.placeholder} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {field?.options?.map((item: any, index: number) => (
                                                <SelectItem key={index} value={item}>{item}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            : (field?.fieldType == 'checkbox') ?
                                <div className="w-full flex items-center space-x-2">
                                    <Checkbox id={field?.fieldName} onCheckedChange={(isSelected) => handleCheckBox(field.fieldLabel, field.fieldName, isSelected)} />
                                    <Label
                                        htmlFor={field?.fieldName}
                                        className="text-sm text-gray-700"
                                    >
                                        {field?.fieldLabel}
                                    </Label>
                                </div> :
                                (field?.fieldType == 'radio') ?
                                    <div className='w-full'>
                                        <Label htmlFor={field?.fieldName} className='text-xs text-gray-500'>{field?.fieldLabel}</Label>
                                        <RadioGroup className='mt-1'>
                                            {field?.options?.map((item: any, index: number) => (
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value={item} id={item} onClick={() => handleSelectChange(item, field.fieldName)} />
                                                    <Label htmlFor={item} className='text-sm text-gray-500'>{item}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                    :
                                    <div className='w-full'>
                                        <Label htmlFor={field?.fieldName} className='text-xs text-gray-500'>{field?.fieldLabel}</Label>
                                        <Input
                                            className='mt-1 bg-transparent w-full focus-visible:ring-2 focus-visible:ring-primary'
                                            id={field?.fieldName}
                                            name={field?.fieldName}
                                            type={field?.fieldType}
                                            placeholder={field?.placeholder}
                                            onChange={(e) => onHandleInputChange(e)}
                                        // required={field?.isRequired}
                                        />
                                    </div>
                        }
                        {isEdit && <div className='flex items-center justify-center'>
                            <FieldEdit defaultValue={field} onUpdate={(value) => onUpdate(value, index)} onDeleteFormField={() => onDeleteFormField(index)} />
                        </div>}
                    </div>
                ))}
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    );
}

export default FormUi;
