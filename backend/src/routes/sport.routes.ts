import express from 'express'
import { SportController } from '../controllers/sport.controller';

const sportRouter = express.Router();

sportRouter.route("/allSports/:type").get((req, res)=> {
    new SportController().getAllSports(req, res);
});

sportRouter.route("/getDisciplines").post((req, res)=> {
    new SportController().getDisciplines(req, res);
});

sportRouter.route("/addSport").post((req, res)=> {
    new SportController().addSport(req, res);
});

export default sportRouter;