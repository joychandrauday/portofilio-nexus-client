/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'



// Fetching all blogs with optional limit and query
export const getAllBlogs = async (limit?: string, query?: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs?limit=${limit}&${query}`, {
            next: { revalidate: 10 },
        }
        );
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};

// Fetching a single blog by its ID
export const getSingleBlog = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${id}`, {
            cache: 'no-store',
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
