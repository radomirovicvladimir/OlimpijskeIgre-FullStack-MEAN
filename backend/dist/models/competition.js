"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
;
;
exports.default = mongoose_1.default.model('Competition', Competition, 'competitions');
//# sourceMappingURL=competition.js.map