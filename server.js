import http from 'http';
import app from './app.js'
import mongoose from 'mongoose';


const PORT = 3001;

const MONGO_URL = 'mongodb+srv://smart-brain-api:!Q2w3e4r@smartbraincluster.6ysl47u.mongodb.net/?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error('err');
});

const server = http.createServer(app);

const startServer = async () => {
    await mongoose.connect(MONGO_URL);

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    })
}

startServer();