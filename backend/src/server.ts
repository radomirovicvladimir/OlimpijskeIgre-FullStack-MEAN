import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import moongose from "mongoose";
import path from 'path'

import userRouter from "./routes/user.routes";
import countryRouter from './routes/countries.routes';
import sportRouter from './routes/sport.routes';
import participantRouter from './routes/participants.routes';
import competitionRouter from './routes/competition.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/flags", express.static(path.join(__dirname, "../flags")));

try {
    moongose.connect("mongodb://localhost:27017/olimpijada");
} catch (error) {
    console.log("Mongo connection failed.");
}

const connection = moongose.connection;

connection.once("open", () => {
    console.log(`Mongo connected.`);
});

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Server working.");
});

router.use("/users", userRouter);
router.use("/countries", countryRouter);
router.use("/sports", sportRouter);
router.use("/participants", participantRouter);
router.use("/competitions", competitionRouter);

app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));