import express from 'express';
import Country from '../models/country';
import User from "../models/user";

export class UserController {
    getAllUsers = (req: express.Request, res: express.Response) => {
        User.find({}, (err, users) => {
            if (err) {
                console.log(err);
            } else {
                res.json(users);
            }
        })
    } // end of getAllUsers

    getDelegates = (req: express.Request, res: express.Response) => {
        User.find({type: "delegate"}, (err, users) => {
            if (err) {
                console.log(err);
            } else {
                res.json(users);
            }
        })
    };

    register = (req: express.Request, res: express.Response) => {
        User.findOne({ username: req.body.username }, (err, doc) => {
            if (err) {
                console.log(err);
            } else if (doc) {
                res.json({
                    message: "Username not available",
                    user: null
                })
            } else if (req.body.type == "leader") {
                User.findOne({ type: "leader", country: req.body.country, status: "approved" }, (err, doc) => {
                    if (err) {
                        console.log(err);
                    } else if (doc) {
                        res.json({
                            message: "Leader for this country already registered!",
                            user: null
                        })
                    } else {
                        Country.findOne({ name: req.body.country }, (err, doc) => {
                            if (err) {
                                console.log(err);
                            } else if (!doc) {
                                const url = req.protocol + "://" + req.get("host");
                                let image_path = "";
                                if (req.file) {
                                    image_path = url + "/flags/" + req.file.filename;
                                } else {
                                    console.log("Error: no flag image");
                                }
                                const country = new Country({
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
                                })
                            } else {
                                console.log("Country in DB");
                            }
                            // add new user
                            const user = new User({
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
            } else { // if not leader
                Country.findOne({ name: req.body.country }, (err, doc) => {
                    if (err) {
                        console.log(err);
                    } else if (!doc) {
                        const url = req.protocol + "://" + req.get("host");
                        let image_path = "";
                        if (req.file) {
                            image_path = url + "/flags/" + req.file.filename;
                        } else {
                            console.log("Error: no flag image");
                        }
                        const country = new Country({
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
                        })
                    } else {
                        console.log("Country in DB");
                    }
                    // add new user
                    const user = new User({
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
    } // end of register

    login = (req: express.Request, res: express.Response) => {
        User.findOne({username: req.body.username, password: req.body.password, status: "approved"}, (err, userLogin)=> {
            if (err) {
                console.log(err);
            } else if (!userLogin) {
                res.json({
                    message: "User not registered!",
                    user: null
                });
            } else {
                res.json({
                    message: "",
                    user: userLogin
                });
            }
        }) // end of find user with username and password
    } // end of login

    approve = (req: express.Request, res: express.Response) => {
        console.log(req.body);
        if (req.body.type !== "leader") {
            User.updateOne({username: req.body.username}, {status: "approved"}, (err, user)=> {
                if (err) {
                    console.log(err);
                } else {
                    res.send("");
                }
            });
        } else {
            User.findOne({ type: "leader", country: req.body.country, status: "approved" }, (err, doc) => {
                if (err) {
                    console.log(err);
                } else if (doc) {
                    res.send("Leader for this country already registered!"); 
                } else {
                    User.updateOne({username: req.body.username}, {status: "approved"}, (err, user)=> {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("");
                        }
                    });
                }
            }); // end of find user 
        }
    } // end of approve

    delete = (req: express.Request, res: express.Response) => {
        User.deleteOne({username: req.body.username}, err => {
            if (err) {
                console.log(err);
            } else {
                res.send("");
            }
        })
    } // end of delete
};