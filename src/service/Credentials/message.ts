/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

// Fetching all projects
export const sendMessage = async ({ name, message, sender }: { name: string, message: string, sender: string }): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/credentials/message`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                message,
                sender
            }), // Sending the data as an object in the body
        });

        const response = await res.json();
        return response.data.social;
    } catch (error: any) {
        return Error(error);
    }
};
