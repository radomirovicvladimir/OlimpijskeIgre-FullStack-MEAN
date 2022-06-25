"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionController = void 0;
const participant_1 = __importDefault(require("../models/participant"));
const competition_1 = __importDefault(require("../models/competition"));
const country_1 = __importDefault(require("../models/country"));
class CompetitionController {
    constructor() {
        this.addCompetition = (req, res) => {
            let newParticipants = [];
            for (var i = 0; i < req.body.participants.length; i++) {
                let pInfo = req.body.participants[i].split("-");
                let p = {
                    id: pInfo[0],
                    name: pInfo[1],
                    result: -1,
                    hasResult: false
                };
                newParticipants.push(p);
            }
            let competition = new competition_1.default({
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
        };
        this.getDelegateCompetitions = (req, res) => {
            competition_1.default.find({ delegates: { $in: [req.body.delegateId] } }, (err, docs) => {
                if (err) {
                    console.log(err);
                }
                else {
                    //console.log(docs);
                    res.json(docs);
                }
            });
        };
        // req.body {competition, date}
        this.setSchedule = (req, res) => {
            let selDate = new Date(req.body.date);
            let competition = req.body.competition;
            competition_1.default.find({}, (err, competitions) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let dateTaken = false;
                    for (var i = 0; i < competitions.length; i++) {
                        if (competitions[i].groups.length != 0) {
                            for (var j = 0; j < competitions[i].groups.length; j++) {
                                if (!competitions[i].groups[j].schedule || competitions[i].groups[j].schedule.location !== competition.locations[0])
                                    continue;
                                let dd = new Date(competitions[i].groups[j].schedule.date);
                                if (dd.getTime() === selDate.getTime()) {
                                    dateTaken = true;
                                    break;
                                }
                            }
                            if (dateTaken)
                                break;
                        }
                        else if (competitions[i].locations[0] == competition.locations[0]) {
                            let dd = new Date(competitions[i].date);
                            if (dd.getTime() === selDate.getTime()) {
                                dateTaken = true;
                                break;
                            }
                        }
                    }
                    if (dateTaken) {
                        res.json({ message: "Date taken." });
                    }
                    else {
                        competition_1.default.updateOne({ _id: competition._id }, { $set: { "date": req.body.date, "hasSchedule": true } }, (err, doc) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.json({ message: "Schedule updated" });
                            }
                        });
                    }
                }
            }); // end Competition.findAll
        };
        // {_id, group, hasSchedule}
        this.setGroupSchedule = (req, res) => {
            let group = req.body.group;
            console.log("Set group schedule", group.schedule);
            let selDate = new Date(group.schedule.date);
            competition_1.default.find({}, (err, competitions) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let dateTaken = false;
                    for (var i = 0; i < competitions.length; i++) {
                        if (competitions[i].groups.length != 0) {
                            for (var j = 0; j < competitions[i].groups.length; j++) {
                                if (!competitions[i].groups[j].schedule || competitions[i].groups[j].schedule.location !== group.schedule.location)
                                    continue;
                                let dd = new Date(competitions[i].groups[j].schedule.date);
                                //console.log(selDate.getTime(), "?", dd.getTime());
                                if (dd.getTime() === selDate.getTime()) {
                                    dateTaken = true;
                                    break;
                                }
                            }
                            if (dateTaken)
                                break;
                        }
                        else if (competitions[i].locations[0] == group.schedule.location) {
                            let dd = new Date(competitions[i].date);
                            //console.log(selDate.getTime(), "?", dd.getTime());
                            if (dd.getTime() === selDate.getTime()) {
                                dateTaken = true;
                                break;
                            }
                        }
                    }
                    if (dateTaken) {
                        res.json({ message: "Date taken." });
                    }
                    else {
                        competition_1.default.updateOne({ _id: req.body._id, "groups.first.id": group.first.id }, { $set: { "groups.$.schedule": group.schedule } }, (err, doc) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                competition_1.default.updateOne({ _id: req.body._id }, { $set: { "hasSchedule": req.body.hasSchedule } }, (err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        res.json({ message: "Group schedule updated" });
                                    }
                                }); // update hasSchedule
                            }
                        }); // end od update Competition
                    }
                }
            }); // end Competition.findAll
        };
        this.setCompetitionSchedule = (req, res) => {
            competition_1.default.updateOne({ _id: req.body._id }, { $set: { "hasSchedule": req.body.hasSchedule } }, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ message: "Competition schedule updated" });
                }
            }); // update hasSchedule
        };
        this.updateResult = (req, res) => {
            competition_1.default.updateOne({ _id: req.body._id, "participants.id": req.body.participantId }, { $set: { "participants.$.result": req.body.result, "participants.$.hasResult": true } }, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ message: "Results updated" });
                }
            });
        }; // end of update result
        this.updateGroupResults = (req, res) => {
            console.log("update group results", req.body.group);
            competition_1.default.updateOne({ _id: req.body._id, "groups.first.id": req.body.group.first.id }, { $set: { "groups.$": req.body.group } }, (err, doc) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("updated group", doc);
                    res.json({ message: "Group updated" });
                }
            });
        };
        this.updateGroups = (req, res) => {
            competition_1.default.updateOne({ _id: req.body._id }, { $set: { groups: req.body.groups } }, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ message: "Groups updated" });
                }
            });
        };
        this.updateParticipants = (req, res) => {
            competition_1.default.updateOne({ _id: req.body._id }, { $set: { participants: req.body.participants } }, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ message: "Participants updated" });
                }
            });
        };
        this.decrementRound = (req, res) => {
            competition_1.default.updateOne({ _id: req.body._id }, { $inc: { "currentRound": -1 }, $set: { "hasSchedule": false } }, (err) => {
                res.json({ message: "Round decremented and hasSchedule <= false" });
            });
        };
        this.removeCompetition = (req, res) => {
            competition_1.default.deleteOne({ _id: req.body._id }, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send("");
                }
            });
        };
        this.giveMedal = (req, res) => {
            let filter = null;
            if (req.body.medal == "gold") {
                filter = {
                    $inc: {
                        "medals.gold": 1
                    }
                };
            }
            else if (req.body.medal == "silver") {
                filter = {
                    $inc: {
                        "medals.silver": 1
                    }
                };
            }
            else {
                filter = {
                    $inc: {
                        "medals.bronze": 1
                    }
                };
            }
            participant_1.default.findOne({ _id: req.body._id }, (err, p) => {
                if (err) {
                    console.log(err);
                }
                else {
                    participant_1.default.updateOne({ _id: req.body._id }, filter, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(req.body._id, p.country, filter);
                            country_1.default.updateOne({ name: p.country }, filter, (err) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    res.send("");
                                }
                            });
                        }
                    });
                }
            });
        }; // end of giveMedal
    }
}
exports.CompetitionController = CompetitionController;
;
//# sourceMappingURL=competition.controller.js.map