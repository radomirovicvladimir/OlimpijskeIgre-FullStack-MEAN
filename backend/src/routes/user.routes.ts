import express from 'express'
import { UserController } from '../controllers/user.controller';

import { upload } from '../storage';

const userRouter = express.Router();

userRouter.route("/").get((req, res)=> {
    res.send("User routes working!")
});

userRouter.route("/allUsers").get((req, res)=> {
    new UserController().getAllUsers(req, res);
});

userRouter.route("/getDelegates").get((req, res)=> {
    new UserController().getDelegates(req, res);
});

userRouter.route("/register").post(upload.single("flag"),(req, res)=> {
    new UserController().register(req, res);
});

userRouter.route("/login").post((req, res)=> {
    new UserController().login(req, res);
});

userRouter.route("/approve").post((req, res)=> {
    new UserController().approve(req, res);
});

userRouter.route("/delete").post((req, res)=> {
    new UserController().delete(req, res);
});

export default userRouter;