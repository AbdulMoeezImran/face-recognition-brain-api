import express, { response } from 'express';
import bodyParser from 'body-parser';
import bcrypt from "bcrypt-nodejs";
import cors from 'cors';
import knex from 'knex';
import { handleRegister} from './controllers/register.js';
import { handleSignin} from './controllers/signin.js';
import { handleProfile} from './controllers/profile.js';
import { handleImage} from './controllers/image.js';


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'admin',
        database: 'smart_brain'
    }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get("/", (req, res) => {
    db("users").then(user => {
        res.json(user);
    }).catch(err => {
        console.error(err);
        res.status(500).send("An error occurred.");
    });
});


app.post("/signin", handleSignin(db, bcrypt));
app.post("/register", handleRegister(db, bcrypt));
app.get('/profile/:id', handleProfile(db))
app.put('/image', handleImage(db))



app.listen(3001, () => {
    console.log('app is running on port 3001');
});