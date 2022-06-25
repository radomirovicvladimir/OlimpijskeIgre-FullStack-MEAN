"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer = require("multer");
const path_1 = __importDefault(require("path"));
const MIME_TYPE_MAP = new Map([
    ['image/png', 'png'],
    ['image/jpeg', 'jpeg'],
    ['image/jpg', 'jpg']
]);
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path_1.default.join(__dirname, '../flags'));
    },
    filename: function (req, file, callback) {
        // console.log("storage", file);
        let name = file.originalname.toLowerCase();
        const ext = MIME_TYPE_MAP.get(file.mimetype);
        //console.log(name);
        callback(null, name + "." + ext);
    },
});
exports.upload = multer({ "storage": storage });
//# sourceMappingURL=storage.js.map