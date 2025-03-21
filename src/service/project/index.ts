/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

// Fetching all projects
export const getProjects = async (): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/projects`, {
            cache: 'no-store',
        });
        return res.json();  // Return the fetched projects as JSON
    } catch (error: any) {
        return Error(error);  // Handle any errors
    }
};

// Fetch a single project by ID
export const getSingleProject = async (id: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/projects/${id}`, {
            cache: 'no-store',
        });
        return res.json();  
    } catch (error: any) {
        return Error(error);  // Handle any errors
    }
};


