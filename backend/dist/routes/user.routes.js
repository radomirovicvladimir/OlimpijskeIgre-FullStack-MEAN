"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const storage_1 = require("../storage");
const userRouter = express_1.default.Router();
userRouter.route("/").get((req, res) => {
    res.send("User routes working!");
});
userRouter.route("/allUsers").get((req, res) => {
    new user_controller_1.UserController().getAllUsers(req, res);
});
userRouter.route("/getDelegates").get((req, res) => {
    new user_controller_1.UserController().getDelegates(req, res);
});
userRouter.route("/register").post(storage_1.upload.single("flag"), (req, res) => {
    new user_controller_1.UserController().register(req, res);
});
userRouter.route("/login").post((req, res) => {
    new user_controller_1.UserController().login(req, res);
});
userRouter.route("/approve").post((req, res) => {
    new user_controller_1.UserController().approve(req, res);
});
userRouter.route("/delete").post((req, res) => {
    new user_controller_1.UserController().delete(req, res);
});
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map