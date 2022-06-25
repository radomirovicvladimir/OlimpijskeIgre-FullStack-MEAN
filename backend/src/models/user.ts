import mongoose from 'mongoose'
const Schema = mongoose.Schema;

let User = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    status: {
        type: String
    },
    competitions: {
        type: Array
    },
    country: {
        type: String
    }
});

export default mongoose.model('User', User, 'users');