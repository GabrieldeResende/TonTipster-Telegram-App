import { match } from "@/entity/match";
import { fetchMatchesAPI } from "@/services/matches_API";
import { useEffect, useState } from "react";

const useMatches = (): match[] => {
    const [matches, setMatches] = useState<match[]>([])

    const fetchMatches = async () => {
        let response;
        try {
            response = await fetchMatchesAPI()
        } catch (error) {
            console.log(error)
        }


        if (response?.status !== 200) return;
        const responseBody: match[] = response.data.response
        setMatches(responseBody.map((match) => match.match))
    }

    useEffect(() => {
        fetchMatches();
    }, [])

    return matches;
}

export default useMatches;