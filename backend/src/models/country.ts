import mongoose from 'mongoose'
const Schema = mongoose.Schema;

let Country = new Schema({
    name: {
        type: String
    },
    image_path: {
        type: String
    },
    medals: {
        type: Object
    }
});

export default mongoose.model('Country', Country, 'countries');