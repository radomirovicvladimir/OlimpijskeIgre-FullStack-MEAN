import mongoose from 'mongoose'
const Schema = mongoose.Schema;

let Competition = new Schema({
    sport: {
        type: String
    },
    discipline: {
        type: String
    },
    gender: {
        type: String
    },
    locations: {
        type: Array
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    date: {
        type: Date
    },
    delegates: {
        type: Array
    },
    participants: {
        type: Array // CompetitionParticipant
    },
    groups: {
        type: Array
    },
    currentRound: {
        type: Number
    },
    form: {
        type: Object // CompetitionForm
    },
    hasSchedule: {
        type: Boolean
    }
});

export interface CompetitionParticipant {
    id: string; // ID
    name: string;
    result: number;
    hasResult: boolean
};

export interface CompetitionGroup {
    first: CompetitionParticipant;
    second: CompetitionParticipant;
    hasResult: boolean;
    schedule: Schedule
};

export interface Schedule {
    date: Date,
    location: string
}

export interface CompetitionForm {
    type: string; // { one-on-one, all }
    numRounds: number;
    winnerPoints: number;
    roundRanking: string; // { sumPoints, bestResult }
    finalRanking: string; // { sortMin, sortMax }
    minPlayers: number;
    maxPlayers: number;
    resultType: string; // { distance, height, time, points, matches? }
}

export default mongoose.model('Competition', Competition, 'competitions');