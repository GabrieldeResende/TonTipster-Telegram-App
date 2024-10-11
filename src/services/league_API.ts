import axios from "axios";

export const fetchLeagueAPI = async () => {
    try {
        const options = {
            method: 'GET',
            url: `https://v3.football.api-sports.io/leagues?current=true&season=${new Date().getFullYear()}`,
            headers: {
                'x-rapidapi-key': '86ead8f9b275639a60446ddeae83c439',
                'x-rapidapi-host': 'v3.football.api-sports.io'
            }
        };

        const response = await axios.request(options);
        return response
    } catch (error) {
        console.error('Error fetching matches:', error);
    }
};
