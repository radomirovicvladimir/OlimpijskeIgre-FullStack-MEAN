import express from 'express'
import Competition from '../models/competition';
import Participant from '../models/participant'

interface participantInterface {
    _id: string,
    firstname: string;
    lastname: string;
    country: string;
    gender: string;
    sport: string;
    disciplines: Array<string>;
    type: string;
    medals: Object;
    competitions: Array<string>
}

export class ParticipantController {

    getParticipantById = (req: express.Request, res: express.Response) => {
        Participant.findOne({_id: req.body._id}, (err, p)=> {
            if (err) {
                console.log(err);
            } else {
                return res.json(p);
            }
        });
    }

    getAllParticipants = (req: express.Request, res: express.Response) => {
        Participant.find({}, (err, docs)=> {
            if (err) {
                console.log(err);
            } else {
                return res.json(docs);
            }
        });
    }

    getNumberOfParticipants = (req: express.Request, res: express.Response) => {
        Participant.aggregate([
            {
                $group: {
                    _id: "$country",
                    total: { $sum: 1 }
                }
            },{
                $project: {
                    _id: 0,
                    country: "$_id",
                    total: "$total"
                }
            }
        ]).exec((err, docs) => {
            res.json(docs);
        });
    }


    addParticipant = (req: express.Request, res: express.Response) => {
        // check if competition is registered
        Competition.findOne({sport: req.body.sport, discipline: req.body.discipline, gender: req.body.gender}, (err, docs)=> {
            if (err) {
                console.log(err);
            } else if (docs) {
                //console.log(docs);
                res.json({ message: "Competition already registered!" });
            } else {
                // Check if there are participants registered for this sport and discipline, this country and this gender
                Participant.findOne({ sport: req.body.sport, disciplines: req.body.discipline, country: req.body.country, gender: req.body.gender }, (err, doc) => {
                    // console.log(doc);
                    if (err) {
                        console.log(err);
                    } else if (doc) {
                        // console.log(docs);
                        res.json({ message: "Participant already registered!" });
                    } else {
                        // Check if this participant is registered for another sport
                        Participant.findOne({ firstname: req.body.firstname, lastname: req.body.lastname }, (err, doc: participantInterface) => {
                            if (err) {
                                console.log(err);
                            }
                            if (doc && doc.sport !== req.body.sport) {
                                res.json({ message: "Participant registered for another sport!" });
                            } else if (doc) {
                                Participant.findOneAndUpdate({_id: doc._id}, { $push: {disciplines: req.body.discipline}}, (err, doc)=> {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.json({ message: "Participant registered successfully!" });
                                    }
                                });
                            } else {
                                let p = new Participant({
                                    firstname: req.body.firstname,
                                    lastname: req.body.lastname,
                                    country: req.body.country,
                                    gender: req.body.gender,
                                    sport: req.body.sport,
                                    disciplines: [req.body.discipline],
                                    type: req.body.type,
                                    medals: {
                                        gold: 0,
                                        silver: 0,
                                        bronze: 0
                                    },
                                    competitions: []
                                });
                                p.save().then((doc) => {
                                    res.json({ message: "Participant registered successfully!" });
                                });
                            }
                        });
                    }
                }); // end of find participant for same sport, discipline and country
            }
        });
        

    } // end of addParticipant

    search = (req: express.Request, res: express.Response) => {
        console.log(req.body);
        let search_filter: searchFilter = {};
        if (req.body.firstname !== "") {
            search_filter.firstname = req.body.firstname;
        }
        if (req.body.lastname !== "") {
            search_filter.lastname = req.body.lastname;
        }
        if (req.body.country !== "") {
            search_filter.country = req.body.country;
        }
        if (req.body.sport !== "") {
            search_filter.sport = req.body.sport;
        }
        if (!(req.body.disciplines.length == 1 && req.body.disciplines[0] == "")) {
            search_filter.disciplines = { $in: req.body.disciplines};
        }
        if (req.body.gender !== "") {
            search_filter.gender = req.body.gender;
        }
        console.log("filter:", search_filter);
        Participant.find(search_filter, (err, docs)=> {
            if (err) {
                console.log(err);
            } else {
                res.json(docs);
            }
        })


    } // end of search

}; // end of class ParticipantController

interface searchFilter {
    firstname?: string;
    lastname?: string;
    country?: string;
    sport?: string;
    disciplines?: Object;
    gender?: string;
    // medals?: Object; // { $gte: 1}
}