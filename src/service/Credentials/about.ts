/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { revalidatePath } from "next/cache";

// Fetching all projects
export const getabout = async (): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/credentials`, {
            cache: 'no-store',
        });
        const response = await res.json();
        return response.data.about;
    } catch (error: any) {
        return Error(error);
    }
};



// Edit a project
export const editabout = async (aboutData: any): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/credentials/about/${process.env.CREDENTIALS_ID}`, {
            method: "PUT",
            body: JSON.stringify(aboutData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        revalidatePath(`/user/dashboard`);
        return res.json();  // Return the updated project data as JSON
    } catch (error: any) {
        return Error(error);  // Handle any errors
    }
};

