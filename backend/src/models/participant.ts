import mongoose from 'mongoose'
const Schema = mongoose.Schema;

let Participant = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    country: {
        type: String
    },
    gender: {
        type: String
    },
    sport: {
        type: String
    },
    disciplines: {
        type: Array
    },
    type: {
        type: String
    },
    medals: {
        type: Object
    },
    competitions: {
        type: Array
    }
});

export interface ParticipantInterface {
    _id: string,
    firstname: string,
    lastname: string,
    country: string,
    gender: string,
    sport: string,
    discipline: string,
    type: string,
    medals: Object,
    competitions: Array<string>
}


export default mongoose.model('Participant', Participant, 'participants');