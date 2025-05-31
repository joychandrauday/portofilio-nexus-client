/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
// Fetching all projects
export const geteducation = async (): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/credentials`, {
            next: { revalidate: 10 },
        });
        const response = await res.json();
        return response.data.education;
    } catch (error: any) {
        return Error(error);
    }
};

