import express from 'express'
import { CompetitionController } from '../controllers/competition.controller';

const competitionRouter = express.Router();

competitionRouter.route("/addCompetition").post((req, res) => {
    new CompetitionController().addCompetition(req, res);
});

competitionRouter.route("/getDelegateCompetitions").post((req, res)=> {
    new CompetitionController().getDelegateCompetitions(req, res);
});

competitionRouter.route("/updateResult").post((req, res)=> {
    new CompetitionController().updateResult(req, res);
});

competitionRouter.route("/setSchedule").post((req, res)=> {
    new CompetitionController().setSchedule(req, res);
});

competitionRouter.route("/setGroupSchedule").post((req, res)=> {
    new CompetitionController().setGroupSchedule(req, res);
});

competitionRouter.route("/setCompetitionSchedule").post((req, res)=> {
    new CompetitionController().setCompetitionSchedule(req, res);
});

competitionRouter.route("/updateGroups").post((req, res)=> {
    new CompetitionController().updateGroups(req, res);
});

competitionRouter.route("/updateGroupResults").post((req, res)=> {
    new CompetitionController().updateGroupResults(req, res);
});

competitionRouter.route("/updateParticipants").post((req, res)=> {
    new CompetitionController().updateParticipants(req, res);
});

competitionRouter.route("/decrementRound").post((req, res)=> {
    new CompetitionController().decrementRound(req, res);
});

competitionRouter.route("/remove").post((req, res)=> {
    new CompetitionController().removeCompetition(req, res);
});

competitionRouter.route("/giveMedal").post((req, res)=> {
    new CompetitionController().giveMedal(req, res);
});





export default competitionRouter;