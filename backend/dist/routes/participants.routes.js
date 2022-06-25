"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const participant_controller_1 = require("../controllers/participant.controller");
const participantRouter = express_1.default.Router();
participantRouter.route("/addParticipant").post((req, res) => {
    new participant_controller_1.ParticipantController().addParticipant(req, res);
});
participantRouter.route("/search").post((req, res) => {
    new participant_controller_1.ParticipantController().search(req, res);
});
participantRouter.route("/participantsPerCountry").get((req, res) => {
    new participant_controller_1.ParticipantController().getNumberOfParticipants(req, res);
});
participantRouter.route("/getParticipantById").get((req, res) => {
    new participant_controller_1.ParticipantController().getParticipantById(req, res);
});
participantRouter.route("/allParticipants").get((req, res) => {
    new participant_controller_1.ParticipantController().getAllParticipants(req, res);
});
exports.default = participantRouter;
//# sourceMappingURL=participants.routes.js.map