import mongoose from 'mongoose';


const usersSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    entries: {
        type: Number,
        required: true,
        default: 0
    },
    joined: {
        type: Date,
        required: true
    },
})

const usersDatabase = mongoose.model('users', usersSchema);

export default usersDatabase;