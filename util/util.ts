import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import { menuListTypes } from "./types";

export const menuList: menuListTypes = [
    { id: 1, name: "My Forms", icon: LibraryBig, path: '/dashboard' },
    { id: 2, name: "Responses", icon: MessageSquare, path: '/dashboard/responses' },
    { id: 3, name: "Analytics", icon: LineChart, path: '/dashboard/analytics' },
    { id: 4, name: "Upgrade", icon: Shield, path: '/dashboard/upgrade' },
]

export const sortByKey = (arr: any[], key: string) => {
    arr.sort((a: any, b: any) => {
        const nameA = a[key].toLowerCase();
        const nameB = b[key].toLowerCase();
        if (nameA > nameB) {
            return 1;
        } else if (nameA < nameB) {
            return -1;
        } else {
            return 0;
        }
    })
    return arr;
}