/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

// Fetching all Skills
export const getSkills = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/skill`, {
            next: { revalidate: 10 },
        });
        const data = await res.json();
        return data.data;
    } catch (error: any) {
        return Error(error);  // Handle any errors
    }
};

// Fetch a single Skill by ID
export const getSingleSkill = async (id: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/skill/${id}`, {
            cache: 'no-store',
        });
        return res.json();  // Return the Skill data as JSON
    } catch (error: any) {
        return Error(error);  // Handle any errors
    }
};
