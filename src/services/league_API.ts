import axios from "axios";

export const fetchLeagueAPI = async () => {
    try {
        const options = {
            method: 'GET',
            url: `https://v3.football.api-sports.io/leagues?current=true&season=${new Date().getFullYear()}`,
            // url: `https://v3.football.api-sports.io/leagues?season=2020`,
            headers: {
                'x-rapidapi-key': '71a235c9e1f33c2b0836c1d726dea116',
                'x-rapidapi-host': 'v3.football.api-sports.io'
            }
        };

        const response = await axios.request(options);
        return response
    } catch (error) {
        console.error('Error fetching matches:', error);
    }
};
