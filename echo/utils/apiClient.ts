import axios from 'axios';

export const fetchOpenAIResponse = async (input: string) => {
    try {
        const result = await axios.post('/api/openai', { input });
        return result.data.text;
    }
    catch (error) {
        console.error('Error fetching data from backend:', error);
        throw new Error('Error fetching data from backend');
    }
}