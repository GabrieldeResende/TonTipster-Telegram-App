export type match = {
    match: any
    id: number
    date: string
    home: team,
    away: team,
}

type team = {
    id: number,
    name: string,
    logo: string
}