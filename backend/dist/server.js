"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const countries_routes_1 = __importDefault(require("./routes/countries.routes"));
const sport_routes_1 = __importDefault(require("./routes/sport.routes"));
const participants_routes_1 = __importDefault(require("./routes/participants.routes"));
const competition_routes_1 = __importDefault(require("./routes/competition.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/flags", express_1.default.static(path_1.default.join(__dirname, "../flags")));
try {
    mongoose_1.default.connect("mongodb://localhost:27017/olimpijada");
}
catch (error) {
    console.log("Mongo connection failed.");
}
const connection = mongoose_1.default.connection;
connection.once("open", () => {
    console.log(`Mongo connected.`);
});
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Server working.");
});
router.use("/users", user_routes_1.default);
router.use("/countries", countries_routes_1.default);
router.use("/sports", sport_routes_1.default);
router.use("/participants", participants_routes_1.default);
router.use("/competitions", competition_routes_1.default);
app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map