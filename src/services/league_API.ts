import axios from "axios";

export const fetchLeagueAPI = async () => {
    try {
        const options = {
            method: 'GET',
            url: 'https://v3.football.api-sports.io/leagues?current=true&season=2020', //ajustar url
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

function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
}
