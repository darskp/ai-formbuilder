import { borderStyleType } from "@/lib/types";

export const borderStyles:borderStyleType[] =[
    {
        id: 1,
        name: "default",
        img: '/styles/default.png',
        value: "none",
        key: "border"
    },
    {
        id: 2,
        name: "retro",
        img: '/styles/retro.png',
        value: "5px 5px 0px black",
        key: "boxShadow"
    },
    {
        id: 3,
        name: "border",
        img: '/styles/border.png',
        value: "2px solid",
        key: "border"
    },
    {
        id: 4,
        name: "stack",
        img: '/styles/stack.png',
        value: "8px 8px 0px rgba(0, 0, 0, 0.5)", 
        key: "boxShadow"
    },
    {
        id: 5,
        name: "glass-dark",
        img: '/styles/glass-dark.png',
        value: "0 4px 6px rgba(33, 33, 38, 0.5), 0 1px 3px rgba(33, 33, 38, 0.3)", 
        key: "boxShadow"
    },
    {
        id: 6,
        name: "glass-light",
        img: '/styles/glass-light.png',
        value: "0 4px 6px rgba(255, 255, 255, 0.5), 0 1px 3px rgba(255, 255, 255, 0.3)", 
        key: "boxShadow"
    }
];
