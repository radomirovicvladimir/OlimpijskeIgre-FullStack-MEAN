"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sport_controller_1 = require("../controllers/sport.controller");
const sportRouter = express_1.default.Router();
sportRouter.route("/allSports/:type").get((req, res) => {
    new sport_controller_1.SportController().getAllSports(req, res);
});
sportRouter.route("/getDisciplines").post((req, res) => {
    new sport_controller_1.SportController().getDisciplines(req, res);
});
sportRouter.route("/addSport").post((req, res) => {
    new sport_controller_1.SportController().addSport(req, res);
});
exports.default = sportRouter;
//# sourceMappingURL=sport.routes.js.map