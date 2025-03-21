import { match } from "@/entity/match";
import { fetchMatchesAPI } from "@/services/matches_API";
import { useEffect, useState } from "react";

interface filter {
    leagueId?: number
    fixtureId?: number
}

const useMatches = (filter: filter): match[] => {
    if(filter.leagueId === 0 && filter.fixtureId === 0) return [];
    const [matches, setMatches] = useState<match[]>([])

    const fetchMatches = async () => {
        let response;
        try {
            response = await fetchMatchesAPI(filter.leagueId, filter.fixtureId)
        } catch (error) {
            console.log(error)
        }

        if (response?.status !== 200) return;
        const responseBody: match[] = response.data.response
        setMatches(responseBody.map((match) => match))
    }

    useEffect(() => {
        fetchMatches();
    }, [])

    return matches;
}

export default useMatches;