"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model('Participant', Participant, 'participants');
//# sourceMappingURL=participant.js.map