// app/services/apiService.ts
const apiService = {
    get: async (url: string): Promise<any> => {
        const fullUrl = `${process.env.NEXT_PUBLIC_API_HOST}${url}`;
        console.log('GET Request to:', fullUrl);
    
        try {
            const response = await fetch(fullUrl);
            console.log('Response status:', response.status);
            const json = await response.json();
            console.log('API Response:', json);
            return json;
        } catch (error) {
            console.error('GET Error:', error);
            throw error;
        }
        },
    
        post: async (url: string, data: any): Promise<any> => {
            const fullUrl = `${process.env.NEXT_PUBLIC_API_HOST}${url}`;
            
            try {
                const response = await fetch(fullUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const json = await response.json();
                return json;
            } catch (error) {
                console.error('POST Error (sanitized):', error instanceof Error ? error.message : 'Unknown error');
                throw error;
            }
        }
    };
    
    export default apiService;