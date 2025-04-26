// app/services/apiService.ts
const apiService = {
    get: async (url: string): Promise<any> => {
        const fullUrl = `${process.env.NEXT_PUBLIC_API_HOST}${url}`;
        console.log('Fetching:', fullUrl);
    
        try {
            const response = await fetch(fullUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
        }
    };
    
    export default apiService;