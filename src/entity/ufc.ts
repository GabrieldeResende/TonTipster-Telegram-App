export interface Fight {
    id: number
    date: Date
    time: string
    timestamp: number
    timezone: string
    slug: string
    is_main: boolean
    category: string
    status: Status
    fighters: Fighters
}

export interface Status {
    long: string
    short: string
}

export interface Fighters {
    first: First
    second: Second
}

export interface First {
    id: number
    name: string
    logo: string
    winner: boolean
}

export interface Second {
    id: number
    name: string
    logo: string
    winner: boolean
}
