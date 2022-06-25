import express from 'express'
import { ParticipantController } from '../controllers/participant.controller';

const participantRouter = express.Router();

participantRouter.route("/addParticipant").post((req, res)=> {
    new ParticipantController().addParticipant(req, res);
});

participantRouter.route("/search").post((req, res)=> {
    new ParticipantController().search(req, res);
});

participantRouter.route("/participantsPerCountry").get((req, res)=> {
    new ParticipantController().getNumberOfParticipants(req, res);
});

participantRouter.route("/getParticipantById").get((req, res)=> {
    new ParticipantController().getParticipantById(req, res);
});

participantRouter.route("/allParticipants").get((req, res)=> {
    new ParticipantController().getAllParticipants(req, res);
});

export default participantRouter;