import { match } from "@/entity/match";
import { fetchMatchesAPI } from "@/services/matches_API";
import { useEffect, useState } from "react";

const useMatches = (leagueId: number = 0, fixtureId: number = 0): match[] => {
    const [matches, setMatches] = useState<match[]>([])

    const fetchMatches = async () => {
        let response;
        try {
            response = await fetchMatchesAPI(leagueId, fixtureId)
        } catch (error) {
            console.log(error)
        }

        if (response?.status !== 200) return;
        const responseBody: match[] = response.data.response
        setMatches(responseBody.map((match) => match))
    }

    useEffect(() => {
        fetchMatches();
    }, [matches])

    return matches;
}

export default useMatches;