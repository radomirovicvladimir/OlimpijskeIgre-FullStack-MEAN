"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const competition_controller_1 = require("../controllers/competition.controller");
const competitionRouter = express_1.default.Router();
competitionRouter.route("/addCompetition").post((req, res) => {
    new competition_controller_1.CompetitionController().addCompetition(req, res);
});
competitionRouter.route("/getDelegateCompetitions").post((req, res) => {
    new competition_controller_1.CompetitionController().getDelegateCompetitions(req, res);
});
competitionRouter.route("/updateResult").post((req, res) => {
    new competition_controller_1.CompetitionController().updateResult(req, res);
});
competitionRouter.route("/setSchedule").post((req, res) => {
    new competition_controller_1.CompetitionController().setSchedule(req, res);
});
competitionRouter.route("/setGroupSchedule").post((req, res) => {
    new competition_controller_1.CompetitionController().setGroupSchedule(req, res);
});
competitionRouter.route("/setCompetitionSchedule").post((req, res) => {
    new competition_controller_1.CompetitionController().setCompetitionSchedule(req, res);
});
competitionRouter.route("/updateGroups").post((req, res) => {
    new competition_controller_1.CompetitionController().updateGroups(req, res);
});
competitionRouter.route("/updateGroupResults").post((req, res) => {
    new competition_controller_1.CompetitionController().updateGroupResults(req, res);
});
competitionRouter.route("/updateParticipants").post((req, res) => {
    new competition_controller_1.CompetitionController().updateParticipants(req, res);
});
competitionRouter.route("/decrementRound").post((req, res) => {
    new competition_controller_1.CompetitionController().decrementRound(req, res);
});
competitionRouter.route("/remove").post((req, res) => {
    new competition_controller_1.CompetitionController().removeCompetition(req, res);
});
competitionRouter.route("/giveMedal").post((req, res) => {
    new competition_controller_1.CompetitionController().giveMedal(req, res);
});
exports.default = competitionRouter;
//# sourceMappingURL=competition.routes.js.map