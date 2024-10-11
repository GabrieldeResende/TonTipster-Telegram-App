import { Fight } from "@/entity/ufc";
import { fetchUFCAPI } from "@/services/ufc_API";
import { useEffect, useState } from "react";

const useUFC = (): Fight[] => {
    const [ufcFight, setUfcFight] = useState<Fight[]>([])

    const fetchUFC = async () => {
        let response;
        try {
            response = await fetchUFCAPI()
        } catch (error) {
            console.log(error)
        }


        if (response?.status !== 200) return;
        const responseBody: Fight[] = response.data.response
        setUfcFight(responseBody.map((fightMatch) => fightMatch))
    }

    useEffect(() => {
        fetchUFC();
    }, [])

    return ufcFight;
}

export default useUFC;