"use client"
import { db } from "@/config";
import { jsonForms } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormUi from "../_components/formUi";
import { toast } from "sonner"

const Editform = ({ params: { formId } }: { params: { formId: number | undefined } }) => {
    const { user } = useUser();
    const router = useRouter()
    const [jsonFormData, setJsonFormData] = useState<any>(null);
    const [updateTrigger, setUpdateTrigger] = useState<any>(null)

    const getform = async () => {
        if (user?.primaryEmailAddress?.emailAddress && formId) {
            const result: {
                id: number;
                jsonForm: string;
                createdBy: string;
                createdAt: string;
            }[] = await db.select().from(jsonForms)
                .where(and(eq(jsonForms.id, formId), eq(jsonForms.createdBy,
                    user?.primaryEmailAddress?.emailAddress)));
            console.log("res",);
            const formData = result[0]?.jsonForm;
            setJsonFormData(JSON?.parse(formData))
        }
    }

    useEffect(() => {
        user && getform()
    }, [formId, user])

    const updateDb = async () => {
        if (user?.primaryEmailAddress?.emailAddress && formId) {
            const result = await db.update(jsonForms)
                .set({ jsonForm: jsonFormData })
                .where(and(eq(jsonForms.id, formId), eq(jsonForms.createdBy,
                    user?.primaryEmailAddress?.emailAddress)));
            toast("Updated!!!")

        }
    }
    useEffect(() => {
        if (updateTrigger) {
            setJsonFormData(jsonFormData)
            updateDb()
        }
    }, [updateTrigger])

    console.log("json", jsonFormData);


    const onUpdate = (value: any, index: number) => {
        console.log(jsonFormData);

        // jsonFormData?.formFields[index] = { ...jsonFormData?.formFields[index], fieldLabel: value?.label, placeholder: value?.placeholder }
        jsonFormData.formFields[index].fieldLabel = value?.label
        jsonFormData.formFields[index].placeholder = value?.placeholder
        setUpdateTrigger(Date.now())
    }

    const onDeleteFormField = (indexToNumber: number) => {
        const result = jsonFormData?.formFields?.filter((item: any, index: any) => indexToNumber != index)
        console.log(result);
        jsonFormData.formFields = result;
        setUpdateTrigger(Date.now())

    }

    return (
        <div className="p-10">
            <h2 onClick={() => router.back()} className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold">
                <ArrowLeft />  Back
            </h2>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
                <div className="p-5 border rounded-lg">Controller</div>
                <div className="p-5 md:col-span-2 border rounded-lg lg:flex lg:flex-col lg:items-center lg:justify-center">
                    {jsonFormData && <FormUi jsonFormData={jsonFormData} onUpdate={onUpdate} onDeleteFormField={onDeleteFormField} />}
                </div>
            </div>
        </div>
    )
}

export default Editform;