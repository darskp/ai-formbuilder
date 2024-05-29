"use client"
import { db } from "@/config";
import { jsonForms } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, Share2, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormUi from "../_components/formUi";
import { toast } from "sonner"
import Controller from "../_components/controller";
import { columnNames } from "@/lib/constants";
import { borderStyles } from "@/app/_data/borderStyle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Editform = ({ params: { formId } }: { params: { formId: number | undefined } }) => {
    const router = useRouter()
    const [jsonFormData, setJsonFormData] = useState<any>(null);
    const [updateTrigger, setUpdateTrigger] = useState<any>(null)
    const [selectedTheme, setSelectedTheme] = useState<any>("")
    const [selectedGradient, setSelectedGradient] = useState<any>("")
    const [selectedStyle, setSelectedStyle] = useState<any>(borderStyles[0])
    const { user } = useUser();

    const getform = async () => {
        if (user?.primaryEmailAddress?.emailAddress && formId) {
            const result: {
                id: number;
                jsonForm: string;
                createdBy: string;
                createdAt: string;
                theme?: string,
                gradient?: string | null,
                style?: any,
            }[] = await db.select().from(jsonForms)
                .where(and(eq(jsonForms.id, formId), eq(jsonForms.createdBy,
                    user?.primaryEmailAddress?.emailAddress)));
            const formData = result[0]?.jsonForm;
            setJsonFormData(JSON?.parse(formData))
            setSelectedTheme(result[0]?.theme)
            setSelectedGradient(result[0]?.gradient)
            setSelectedStyle(JSON?.parse(result[0]?.style) || borderStyles[0])
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

    const onUpdate = (value: any, index: number) => {
        jsonFormData.formFields[index].placeholder = value?.placeholder;
        jsonFormData.formFields[index].fieldLabel = value?.label
        setUpdateTrigger(Date.now())
    }

    const onDeleteFormField = (indexToNumber: number) => {
        const result = jsonFormData?.formFields?.filter((item: any, index: any) => indexToNumber != index)
        jsonFormData.formFields = result;
        setUpdateTrigger(Date.now())
    }

    const updateControllerField = async (value: any, column: { id: number, cname: string }) => {
        if (user?.primaryEmailAddress?.emailAddress && formId) {
            const result = await db.update(jsonForms)
                .set({ [column.cname]: value })
                .where(and(eq(jsonForms.id, formId), eq(jsonForms.createdBy,
                    user?.primaryEmailAddress?.emailAddress)));
        }
    }

    return (
        <div className="p-10 pt-1">
            <div className="flex w-100 items-center justify-between">
                <div> <button><h2 onClick={() => router.back()} className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold">
                    <ArrowLeft />  Back
                </h2></button></div>
                <div className="flex gap-2">
                    <Link href={`/aiform/${formId}`} target="_blank">
                        <Button size="sm" className="flex gap-2">
                            <SquareArrowOutUpRight className="w-5 h-5" /> Live Preview
                        </Button>
                    </Link>
                    <Button size="sm" className="flex gap-2 hover:bg-green-700 bg-green-600"><Share2 className="w-5 h-5" /> Share</Button>
                </div>
            </div>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
                <div className="p-5 border rounded-lg">
                    <Controller
                        selectedThemeUpdate={(value: string) => {
                            updateControllerField(value, columnNames[0]),
                                setSelectedTheme(value)
                        }}
                        selectedTheme={selectedTheme}
                        selectedGradient={selectedGradient}
                        selectedStyle={selectedStyle}
                        selectedGradientUpdate={(value: string) => {
                            updateControllerField(value, columnNames[1]),
                                setSelectedGradient(value)
                        }}
                        selectedStyleUpdate={(styleProp: any) => {
                            updateControllerField(styleProp, columnNames[2]),
                                setSelectedStyle(styleProp)
                        }}
                    />
                </div>
                <div style={{ background: selectedGradient }} className="p-5 md:col-span-2 border rounded-lg lg:flex lg:flex-col lg:items-center">
                    {jsonFormData &&
                        <FormUi selectedTheme={selectedTheme}
                            isEdit={true}
                            selectedStyle={selectedStyle}
                            jsonFormData={jsonFormData}
                            onUpdate={onUpdate}
                            onDeleteFormField={onDeleteFormField}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Editform;