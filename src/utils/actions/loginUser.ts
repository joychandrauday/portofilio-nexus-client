"use server"

import { FormValues } from "@/app/login/page";

export const loginUser = async (data: FormValues) => {
    const res = await fetch(`https://blog-chronicle-backend.vercel.app/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        cache: "no-store"
    })
    const userInfo = await res.json()
    return userInfo;
}