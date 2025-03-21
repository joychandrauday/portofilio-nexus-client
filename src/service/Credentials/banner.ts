// Modify getBanner to ensure valid data is returned
export const getBanner = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/credentials`, {
            cache: 'no-store',
        });

        const data = await res.json();
        return data.data?.banner
    } catch (error) {
        console.error('Error fetching banner:', error);
        return {
            title: 'Error',
            subtitle: 'Failed to fetch banner data',
            bannerImage: '',
            designationPretext: '',
            designations: []
        };
    }
};
