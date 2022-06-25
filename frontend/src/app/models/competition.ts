import { Time } from "@angular/common";

export interface CompetitionParticipant {
    id: string;
    name: string;
    result: number;
    hasResult: boolean
}


export interface CompetitionGroup {
    first: CompetitionParticipant;
    second: CompetitionParticipant;
    hasResult: boolean;
    schedule: Schedule
}

export interface CompetitionForm {
    type: string; // { one-to-one, all }
    numRounds: number;
    winnerPoints: number;
    roundRanking: string; // { sumPoints, bestResult }
    finalRanking: string; // { sortMin, sortMax }
    minPlayers: number;
    maxPlayers: number;
    resultType: string; // { distance, height, time, points, matches? }
}

export interface Schedule {
    date: Date,
    location: string
}

export interface Competition {
    _id: string,
    sport: string,
    discipline: string,
    gender: string,
    location: string,
    startDate: Date,
    endDate: Date,
    delegates: Array<string>,
    participants: Array<CompetitionParticipant>,
    currentRound: number,
    form: CompetitionForm,
    groups: Array<CompetitionGroup>,
    hasSchedule: boolean,
    date: Date
}

const resultType = {
    distance: "M, CM",
    time: "HH:MM:SS, TT",
    points: "0"
}

export default resultType;