"use client"
import { db } from "@/config";
import { jsonForms } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormUi from "../_components/formUi";

const Editform = ({ params: { formId } }: { params: { formId: number | undefined } }) => {
    const { user } = useUser();
    const router = useRouter()
    const [jsonFormData, setJsonFormData] = useState<any>(null)

    const getform = async () => {
        if (user?.primaryEmailAddress?.emailAddress && formId) {
            console.log("caling");

            const result: {
                id: number;
                jsonForm: string;
                createdBy: string;
                createdAt: string;
            }[] = await db.select().from(jsonForms)
                .where(and(eq(jsonForms.id, formId), eq(jsonForms.createdBy,
                    user?.primaryEmailAddress?.emailAddress)));
            console.log("res",);
            const formData = result[0].jsonForm;

            setJsonFormData(formData)
        }
    }

    useEffect(() => {
        user && getform()
    }, [formId, user])

    return (
        <div className="p-10">
            <h2 onClick={() => router.back()} className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold">
                <ArrowLeft />   Back
            </h2>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
                <div className="h-screen p-5 border rounded-lg">Controller</div>
                <div className="h-screen p-4 md:col-span-2 border rounded-lg">
                    <FormUi jsonFormData={jsonFormData} />
                </div>
            </div>
        </div>
    )
}

export default Editform;