export interface match {
    fixture: fixture
    league: league
    teams: teams
    goals: goals
    score: score
}

export interface fixture {
    id: number
    referee: string
    timezone: string
    date: string
    timestamp: number
    periods: periods
    venue: venue
    status: status
}

export interface periods {
    first: number
    second: number
}

export interface venue {
    id: number
    name: string
    city: string
}

export interface status {
    long: string
    short: string
    elapsed: number
    extra: any
}

export interface league {
    id: number
    name: string
    country: string
    logo: string
    flag: string
    season: number
    round: string
}

export interface teams {
    home: home
    away: away
}

export interface home {
    id: number
    name: string
    logo: string
    winner: boolean
}

export interface away {
    id: number
    name: string
    logo: string
    winner: boolean
}

export interface goals {
    home: number
    away: number
}

export interface score {
    halftime: halftime
    fulltime: fulltime
    extratime: extratime
    penalty: penalty
}

export interface halftime {
    home: number
    away: number
}

export interface fulltime {
    home: number
    away: number
}

export interface extratime {
    home: any
    away: any
}

export interface penalty {
    home: any
    away: any
}