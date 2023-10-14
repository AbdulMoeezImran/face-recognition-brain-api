import mongoose from 'mongoose';


const registerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const registerDatabase = mongoose.model('register', registerSchema);

export default registerDatabase;