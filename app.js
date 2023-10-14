import express, { response } from 'express';
import bcrypt from "bcrypt-nodejs";
import cors from 'cors';
import handleRegister from './controllers/register.controllers.js';
import handleSignin from './controllers/signin.controllers.js';
import { handleImage, handleApiCall } from './controllers/image.controllers.js';


const app = express();
app.use(cors());
app.use(express.json());

app.post("/signin", handleSignin(bcrypt));
app.post("/register", handleRegister(bcrypt));
app.put('/image', handleImage);
app.post('/imageurl', handleApiCall);


export default app;