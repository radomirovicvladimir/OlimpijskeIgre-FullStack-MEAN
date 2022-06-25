const multer = require("multer");

import path from "path";


const MIME_TYPE_MAP = new Map([
   ['image/png', 'png'],
   ['image/jpeg', 'jpeg'],
   ['image/jpg', 'jpg']
]);


const storage = multer.diskStorage({
  destination: function (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) {
    callback(null, path.join(__dirname, '../flags'));
  },
  filename: function (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) {
    // console.log("storage", file);
    let name = file.originalname.toLowerCase();
    const ext = MIME_TYPE_MAP.get(file.mimetype);
    //console.log(name);
    callback(null, name + "." + ext);
  },
});


export const upload = multer({"storage": storage});