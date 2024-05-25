"use client"
import { db } from "@/config";
import { jsonForms } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useEffect, useState } from "react";

// const Editform = () => {
const Editform = ({ params: { formId } }: { params: { formId: number | undefined } }) => {
    const user = useUser()
    const [jsonFormData, setJsonFormData] = useState<any>(null)

    const getform = async () => {
        if (user.user?.primaryEmailAddress?.emailAddress && formId) {
            const result = await db.select().from(jsonForms)
                .where(and(eq(jsonForms.id, formId), eq(jsonForms.createdBy,
                    user.user?.primaryEmailAddress?.emailAddress)));
            setJsonFormData(result)
        }
    }

    useEffect(() => {
       user && getform()
    }, [formId])

    console.log("jsonFormData",jsonFormData)

    return (
        <div>{}</div>
    )
}

export default Editform;