import express from 'express'
import Participant, { ParticipantInterface } from '../models/participant';
import Competition, { CompetitionParticipant, CompetitionForm, CompetitionGroup } from '../models/competition'
import Country from '../models/country';

export class CompetitionController {
    addCompetition = (req: express.Request, res: express.Response) => {
        let newParticipants: CompetitionParticipant[] = [];
        for (var i = 0; i < req.body.participants.length; i++) {
            let pInfo: string[] = req.body.participants[i].split("-");
            let p: CompetitionParticipant = {
                id: pInfo[0],
                name: pInfo[1],
                result: -1,
                hasResult: false
            };
            newParticipants.push(p);
        }
        let competition = new Competition({
            sport: req.body.sport,
            discipline: req.body.discipline,
            gender: req.body.gender,
            locations: req.body.locations,
            startDate: new Date(req.body.startDate),
            endDate: new Date(req.body.endDate),
            delegates: req.body.delegates,
            participants: newParticipants,
            currentRound: req.body.form.numRounds,
            form: req.body.form,
            groups: [],
            hasSchedule: false,
            date: null
        });
        console.log("new competition", competition);
        competition.save().then(doc => {
            console.log(doc);
            res.json({ message: "Competition successfully added." });
        });
    }


    getDelegateCompetitions = (req: express.Request, res: express.Response) => {
        Competition.find({ delegates: { $in: [req.body.delegateId] } }, (err, docs) => {
            if (err) {
                console.log(err);
            } else {
                //console.log(docs);
                res.json(docs);
            }
        });
    }

    // req.body {competition, date}
    setSchedule = (req: express.Request, res: express.Response) => {
        let selDate: Date = new Date(req.body.date);
        let competition:CompetitionInterface = req.body.competition;
        Competition.find({}, (err, competitions: CompetitionInterface[]) => {
            if (err) {
                console.log(err);
            } else {
                let dateTaken = false;
                for (var i = 0; i < competitions.length; i++) {
                    if (competitions[i].groups.length != 0) {
                        for (var j = 0; j < competitions[i].groups.length; j++) {
                            if (!competitions[i].groups[j].schedule || competitions[i].groups[j].schedule.location !== competition.locations[0])
                                continue;
                            let dd: Date = new Date(competitions[i].groups[j].schedule.date);
                            if (dd.getTime() === selDate.getTime()) {
                                dateTaken = true;
                                break;
                            }
                        }
                        if (dateTaken) break;
                    } else if (competitions[i].locations[0] == competition.locations[0]) {
                        let dd: Date = new Date(competitions[i].date);
                        if (dd.getTime() === selDate.getTime()) {
                            dateTaken = true;
                            break;
                        }
                    }

                }
                if (dateTaken) {
                    res.json({ message: "Date taken." });
                } else {
                    Competition.updateOne({ _id: competition._id }, { $set: { "date": req.body.date, "hasSchedule": true } }, (err, doc) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ message: "Schedule updated" });
                        }
                    });
                }
            }
        }); // end Competition.findAll
    }

    // {_id, group, hasSchedule}
    setGroupSchedule = (req: express.Request, res: express.Response) => {
        let group = req.body.group;
        console.log("Set group schedule", group.schedule);
        let selDate: Date = new Date(group.schedule.date);
        Competition.find({}, (err, competitions: CompetitionInterface[]) => {
            if (err) {
                console.log(err);
            } else {
                let dateTaken = false;
                for (var i = 0; i < competitions.length; i++) {
                    if (competitions[i].groups.length != 0) {
                        for (var j = 0; j < competitions[i].groups.length; j++) {
                            if (!competitions[i].groups[j].schedule || competitions[i].groups[j].schedule.location !== group.schedule.location)
                                continue;
                            let dd: Date = new Date(competitions[i].groups[j].schedule.date);
                            //console.log(selDate.getTime(), "?", dd.getTime());
                            if (dd.getTime() === selDate.getTime()) {
                                dateTaken = true;
                                break;
                            }
                        }
                        if (dateTaken) break;
                    } else if (competitions[i].locations[0] == group.schedule.location) {
                        let dd: Date = new Date(competitions[i].date);
                        //console.log(selDate.getTime(), "?", dd.getTime());
                        if (dd.getTime() === selDate.getTime()) {
                            dateTaken = true;
                            break;
                        }
                    }
                }
                if (dateTaken) {
                    res.json({ message: "Date taken." });
                } else {
                    Competition.updateOne({ _id: req.body._id, "groups.first.id": group.first.id },
                        { $set: { "groups.$.schedule": group.schedule } }, (err, doc) => {
                            if (err) {
                                console.log(err);
                            } else {
                                Competition.updateOne({ _id: req.body._id }, { $set: { "hasSchedule": req.body.hasSchedule } }, (err) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.json({ message: "Group schedule updated" });
                                    }
                                }); // update hasSchedule
                            }
                        }); // end od update Competition
                }
            }
        }); // end Competition.findAll

    }

    setCompetitionSchedule = (req: express.Request, res: express.Response) => {
        Competition.updateOne({ _id: req.body._id }, { $set: { "hasSchedule": req.body.hasSchedule } }, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ message: "Competition schedule updated" });
            }
        }); // update hasSchedule
    }


    updateResult = (req: express.Request, res: express.Response) => {
        Competition.updateOne({ _id: req.body._id, "participants.id": req.body.participantId },
            { $set: { "participants.$.result": req.body.result, "participants.$.hasResult": true } }, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json({ message: "Results updated" });
                }
            });

    } // end of update result

    updateGroupResults = (req: express.Request, res: express.Response) => {
        console.log("update group results", req.body.group);
        Competition.updateOne({ _id: req.body._id, "groups.first.id": req.body.group.first.id },
            { $set: { "groups.$": req.body.group } }, (err, doc) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("updated group", doc);
                    res.json({ message: "Group updated" });
                }
            })
    }

    updateGroups = (req: express.Request, res: express.Response) => {
        Competition.updateOne({ _id: req.body._id },
            { $set: { groups: req.body.groups } }, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json({ message: "Groups updated" });
                }
            });
    }

    updateParticipants = (req: express.Request, res: express.Response) => {
        Competition.updateOne({ _id: req.body._id },
            { $set: { participants: req.body.participants } }, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json({ message: "Participants updated" });
                }
            });
    }

    decrementRound = (req: express.Request, res: express.Response) => {
        Competition.updateOne({ _id: req.body._id }, { $inc: { "currentRound": -1 }, $set: { "hasSchedule": false } }, (err) => {
            res.json({ message: "Round decremented and hasSchedule <= false" });
        });
    }

    removeCompetition = (req: express.Request, res: express.Response) => {
        Competition.deleteOne({ _id: req.body._id }, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.send("");
            }
        })
    }

    giveMedal = (req: express.Request, res: express.Response) => {
        let filter: any = null;
        if (req.body.medal == "gold") {
            filter = {
                $inc: {
                    "medals.gold": 1
                }
            }
        } else if (req.body.medal == "silver") {
            filter = {
                $inc: {
                    "medals.silver": 1
                }
            }
        } else {
            filter = {
                $inc: {
                    "medals.bronze": 1
                }
            }
        }

        Participant.findOne({ _id: req.body._id }, (err, p: ParticipantInterface) => {
            if (err) {
                console.log(err);
            } else {
                Participant.updateOne({ _id: req.body._id }, filter, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(req.body._id, p.country, filter);
                        Country.updateOne({ name: p.country }, filter, (err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.send("");
                            }
                        });
                    }
                });
            }
        });

    } // end of giveMedal


};

interface CompetitionInterface {
    _id: string,
    sport: string,
    discipline: string,
    gender: string,
    locations: Array<string>,
    startDate: Date,
    date: Date,
    endDate: Date,
    delegates: Array<string>,
    participants: Array<CompetitionParticipant>,
    groups: Array<CompetitionGroup>,
    currentRound: number,
    form: CompetitionForm,
    hasSchedule: boolean
}
