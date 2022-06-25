"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportController = void 0;
const sport_1 = __importDefault(require("../models/sport"));
class SportController {
    constructor() {
        // getAllSports = (req: express.Request, res: express.Response)=> {
        //     Sport.find({}, (err, sports)=> {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             res.json(sports);
        //         }
        //     })
        // } // end of getAllSports
        this.getAllSports = (req, res) => {
            //console.log(req.params.type);
            if (req.params.type !== "all") {
                sport_1.default.aggregate([
                    {
                        $match: { type: req.params.type }
                    },
                    {
                        $group: { _id: "$name" }
                    },
                    {
                        $project: {
                            _id: 0,
                            name: "$_id"
                        }
                    }
                ]).exec((err, sports) => {
                    // console.log(sports);
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(sports);
                    }
                });
            }
            else {
                sport_1.default.aggregate([
                    {
                        $group: { _id: "$name" }
                    },
                    {
                        $project: {
                            _id: 0,
                            name: "$_id"
                        }
                    }
                ]).exec((err, sports) => {
                    // console.log(sports);
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(sports);
                    }
                });
            }
        }; // end of getAllSports
        this.getDisciplines = (req, res) => {
            if (req.body.type) {
                sport_1.default.find({ name: req.body.sport, type: req.body.type }, (err, ds) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(ds);
                    }
                });
            }
            else {
                sport_1.default.find({ name: req.body.sport }, (err, ds) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(ds);
                    }
                });
            }
        }; // end od getDisciplines
        this.getSportsByType = (req, res) => {
        }; // end of getSportsByType
        this.addSport = (req, res) => {
            let type = (req.body.min_players == req.body.max_players && req.body.min_players == 1) ? "individual" : "team";
            let sport = new sport_1.default({
                name: req.body.sport,
                discipline: req.body.discipline,
                min_players: req.body.min_players,
                max_players: req.body.max_players,
                type: type
            });
            sport.save().then(doc => {
                console.log(doc);
                res.json({ message: "Sport successfully registered." });
            });
        };
    }
}
exports.SportController = SportController;
;
//# sourceMappingURL=sport.controller.js.map