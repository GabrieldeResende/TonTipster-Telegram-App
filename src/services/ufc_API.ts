import axios from "axios";

export const fetchUFCAPI = async () => {
    try {
        const options = {
            method: 'GET',
            url: `https://v1.mma.api-sports.io/fights?season=${new Date().getFullYear()}`, 
            headers: {
                'x-rapidapi-key': '81d85f6cabf782585ca828b6e183434c',
                'x-rapidapi-host': 'v1.mma.api-sports.io'
            }
        };

        const response = await axios.request(options);
        return response
    } catch (error) {
        console.error('Error fetching matches:', error);
    }
};
