import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
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

const FormUi = ({ jsonFormData, onUpdate, onDeleteFormField }: { jsonFormData: any, onUpdate: (value: any, index: number) => void, onDeleteFormField:(index:number)=>void }) => {
    console.log(jsonFormData);


    return (
        <div className='border p-5 rounded-lg lg:w-[600px] '>
            <h2 className='font-bold text-center text-2xl'>{jsonFormData?.formTitle}</h2>
            <h2 className='text-sm text-center text-gray-400'>{jsonFormData?.formSubheading}</h2>
            <div>
                {jsonFormData?.formFields?.map((field: any, index: number) => (
                    <div key={index} className='my-3 flex gap-2 items-center'>
                        {field?.fieldType == 'select' ?
                            <div className='w-full'>
                                <Label htmlFor={field?.fieldName} className='text-xs mb-1 text-gray-500'>{field?.fieldLabel}</Label>
                                <div className='mt-1 '>
                                    <Select>
                                        <SelectTrigger className="w-full focus:ring-2 focus:ring-primary">
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
                                    <Checkbox id={field?.fieldName} />
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
                                                    <RadioGroupItem value={item} id={item} />
                                                    <Label htmlFor={item} className='text-sm text-gray-500'>{item}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                    :
                                    <div className='w-full'>
                                        <Label htmlFor={field?.fieldName} className='text-xs text-gray-500'>{field?.fieldLabel}</Label>
                                        <Input
                                            className='mt-1 w-full focus-visible:ring-2 focus-visible:ring-primary'
                                            id={field?.fieldName}
                                            name={field?.fieldName}
                                            type={field?.fieldType}
                                            placeholder={field?.placeholder}
                                        />
                                    </div>
                        }
                        <div className='flex items-center justify-center'>
                            <FieldEdit defaultValue={field} onUpdate={(value) => onUpdate(value, index)} onDeleteFormField={() => onDeleteFormField(index)}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FormUi;
