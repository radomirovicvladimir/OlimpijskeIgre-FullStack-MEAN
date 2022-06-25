"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const country_1 = __importDefault(require("../models/country"));
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.getAllUsers = (req, res) => {
            user_1.default.find({}, (err, users) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(users);
                }
            });
        }; // end of getAllUsers
        this.getDelegates = (req, res) => {
            user_1.default.find({ type: "delegate" }, (err, users) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(users);
                }
            });
        };
        this.register = (req, res) => {
            user_1.default.findOne({ username: req.body.username }, (err, doc) => {
                if (err) {
                    console.log(err);
                }
                else if (doc) {
                    res.json({
                        message: "Username not available",
                        user: null
                    });
                }
                else if (req.body.type == "leader") {
                    user_1.default.findOne({ type: "leader", country: req.body.country, status: "approved" }, (err, doc) => {
                        if (err) {
                            console.log(err);
                        }
                        else if (doc) {
                            res.json({
                                message: "Leader for this country already registered!",
                                user: null
                            });
                        }
                        else {
                            country_1.default.findOne({ name: req.body.country }, (err, doc) => {
                                if (err) {
                                    console.log(err);
                                }
                                else if (!doc) {
                                    const url = req.protocol + "://" + req.get("host");
                                    let image_path = "";
                                    if (req.file) {
                                        image_path = url + "/flags/" + req.file.filename;
                                    }
                                    else {
                                        console.log("Error: no flag image");
                                    }
                                    const country = new country_1.default({
                                        name: req.body.country,
                                        image_path: image_path,
                                        medals: {
                                            gold: 0,
                                            silver: 0,
                                            bronze: 0
                                        }
                                    });
                                    country.save().then(doc => {
                                        console.log(doc);
                                    });
                                }
                                else {
                                    console.log("Country in DB");
                                }
                                // add new user
                                const user = new user_1.default({
                                    firstname: req.body.firstname,
                                    lastname: req.body.lastname,
                                    username: req.body.username,
                                    password: req.body.password,
                                    country: req.body.country,
                                    email: req.body.email,
                                    type: req.body.type,
                                    status: "waiting",
                                    competitions: []
                                });
                                console.log("New user:", user);
                                user.save().then(newUser => {
                                    res.json({
                                        message: "User registered successfully!",
                                        user: newUser
                                    });
                                }); // end of add new user
                            }); // end of add new country
                        }
                    }); // end of find leader for given country
                }
                else { // if not leader
                    country_1.default.findOne({ name: req.body.country }, (err, doc) => {
                        if (err) {
                            console.log(err);
                        }
                        else if (!doc) {
                            const url = req.protocol + "://" + req.get("host");
                            let image_path = "";
                            if (req.file) {
                                image_path = url + "/flags/" + req.file.filename;
                            }
                            else {
                                console.log("Error: no flag image");
                            }
                            const country = new country_1.default({
                                name: req.body.country,
                                image_path: image_path,
                                medals: {
                                    gold: 0,
                                    silver: 0,
                                    bronze: 0
                                }
                            });
                            country.save().then(doc => {
                                console.log(doc);
                            });
                        }
                        else {
                            console.log("Country in DB");
                        }
                        // add new user
                        const user = new user_1.default({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            username: req.body.username,
                            password: req.body.password,
                            country: req.body.country,
                            email: req.body.email,
                            type: req.body.type,
                            status: "waiting",
                            competitions: []
                        });
                        console.log("New user:", user);
                        user.save().then(newUser => {
                            res.json({
                                message: "User registered successfully!",
                                user: newUser
                            });
                        }); // end of add new user
                    }); // end of add new country
                }
            }); // end of find someone with same username in DB
        }; // end of register
        this.login = (req, res) => {
            user_1.default.findOne({ username: req.body.username, password: req.body.password, status: "approved" }, (err, userLogin) => {
                if (err) {
                    console.log(err);
                }
                else if (!userLogin) {
                    res.json({
                        message: "User not registered!",
                        user: null
                    });
                }
                else {
                    res.json({
                        message: "",
                        user: userLogin
                    });
                }
            }); // end of find user with username and password
        }; // end of login
        this.approve = (req, res) => {
            console.log(req.body);
            if (req.body.type !== "leader") {
                user_1.default.updateOne({ username: req.body.username }, { status: "approved" }, (err, user) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.send("");
                    }
                });
            }
            else {
                user_1.default.findOne({ type: "leader", country: req.body.country, status: "approved" }, (err, doc) => {
                    if (err) {
                        console.log(err);
                    }
                    else if (doc) {
                        res.send("Leader for this country already registered!");
                    }
                    else {
                        user_1.default.updateOne({ username: req.body.username }, { status: "approved" }, (err, user) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.send("");
                            }
                        });
                    }
                }); // end of find user 
            }
        }; // end of approve
        this.delete = (req, res) => {
            user_1.default.deleteOne({ username: req.body.username }, err => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send("");
                }
            });
        }; // end of delete
    }
}
exports.UserController = UserController;
;
//# sourceMappingURL=user.controller.js.map