import express from 'express';
import Sport from '../models/sport';

export class SportController {
    // getAllSports = (req: express.Request, res: express.Response)=> {
    //     Sport.find({}, (err, sports)=> {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             res.json(sports);
    //         }
    //     })
    // } // end of getAllSports

    getAllSports = (req: express.Request, res: express.Response) => {
        //console.log(req.params.type);
        if (req.params.type !== "all") {
            Sport.aggregate([
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
                } else {
                    res.json(sports);
                }
            });
        } else {
            Sport.aggregate([
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
                } else {
                    res.json(sports);
                }
            });
        }
        
    } // end of getAllSports

    getDisciplines = (req: express.Request, res: express.Response) => {
        if (req.body.type) {
            Sport.find({ name: req.body.sport, type: req.body.type }, (err, ds) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(ds);
                }
            });
        } else {
            Sport.find({ name: req.body.sport }, (err, ds) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(ds);
                }
            });
        }
    } // end od getDisciplines

    getSportsByType = (req: express.Request, res: express.Response) => {

    } // end of getSportsByType

    addSport = (req: express.Request, res: express.Response) => {
        let type = (req.body.min_players == req.body.max_players && req.body.min_players == 1) ? "individual" : "team";
        let sport = new Sport({
            name: req.body.sport,
            discipline: req.body.discipline,
            min_players: req.body.min_players,
            max_players: req.body.max_players,
            type: type
        });
        sport.save().then(doc => {
            console.log(doc);
            res.json({message: "Sport successfully registered."});
        })
    }
};