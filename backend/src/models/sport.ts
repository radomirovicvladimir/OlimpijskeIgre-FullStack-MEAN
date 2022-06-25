import mongoose from 'mongoose'
const Schema = mongoose.Schema;

let Sport = new Schema({
    name: {
        type: String
    },
    discipline: {
        type: String
    },
    min_players: {
        type: Number
    },
    max_players: {
        type: Number
    },
    type: {
        type: String
    }
});

export default mongoose.model('Sport', Sport, 'sports');