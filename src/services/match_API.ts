import axios from "axios";

export const fetchMatchesAPI = async (leagueId: number = 0, fixtureId: number = 0) => {

    let params = '';

    if (fixtureId !== 0)
        params = `id=${fixtureId}`
    else
        params = `league=${leagueId}&season=${new Date().getFullYear()}&status=ns`;

    try {
        const options = {
            method: 'GET',
            url: `https://v3.football.api-sports.io/fixtures?${params}`,
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
