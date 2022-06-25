"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryController = void 0;
const country_1 = __importDefault(require("../models/country"));
class CountryController {
    constructor() {
        this.getAllCountries = (req, res) => {
            country_1.default.find({}, (err, docs) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(docs);
                }
            });
        };
    }
}
exports.CountryController = CountryController;
;
//# sourceMappingURL=country.controller.js.map