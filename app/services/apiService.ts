// app/services/apiService.ts
const apiService = {
    get: async (url: string): Promise<any> => {
        const fullUrl = `${process.env.NEXT_PUBLIC_API_HOST}${url}`;
        console.log('Full URL:', fullUrl); // 👈 Log the constructed URL
    
        try {
            const response = await fetch(fullUrl);
            console.log('Response status:', response.status); // 👈 Log HTTP status
            const json = await response.json();
            console.log('API Response:', json); // 👈 Log parsed data
            return json;
        } catch (error) {
            console.error('API Error:', error); // 👈 Detailed error logging
            throw error;
        }
        }
    };
    
    export default apiService;