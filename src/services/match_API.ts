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
