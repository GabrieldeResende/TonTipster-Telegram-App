import { league } from "@/entity/league";
import { fetchLeagueAPI } from "@/services/league_API";
import { useEffect, useState } from "react";

const useLeague = (): league[] => {
    const [league, setLeague] = useState<league[]>([])

    const fetchLeague = async () => {
        let response;
        try {
            response = await fetchLeagueAPI()
        } catch (error) {
            console.log(error)
        }


        if (response?.status !== 200) return;
        const responseBody: league[] = response.data.response
        setLeague(responseBody.map((league) => league.league))

    }

    useEffect(() => {
        fetchLeague();
    }, [])

    return league;
}

export default useLeague;