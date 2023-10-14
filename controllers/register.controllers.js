import registerDatabase from "../mongoSchema/register.mongo.js";
import usersDatabase from '../mongoSchema/signin.mongo.js';

const DEFAULT_ID = 0;

async function getLatestId() {
    const latestId = await registerDatabase.findOne().sort('-id');

    if (!latestId) {
        return DEFAULT_ID;
    }

    return latestId.id;
}

async function saveLogin(login) {
    try {
        await registerDatabase.create({
            id: login.id,
            email: login.email,
            password: login.password
        });
    } catch (error) {
        console.error('Error saving user to the database:', error);
        throw error;
    }
}

async function saveUser(user) {
    try {
        await usersDatabase.create({
            id: user.id,
            name: user.name,
            email: user.email,
            joined: user.joined,

        });
    } catch (error) {
        console.error('Error saving user to the database:', error);
        throw error;
    }
}


const handleRegister = (bcrypt) => async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect form submission');
    }

    try {
        const hash = bcrypt.hashSync(password);
        const newLogin = {
            id: await getLatestId() + 1,
            email,
            name,
            password: hash,
            joined: new Date(),
        };
        const user = await registerDatabase.findOne({
            email: newLogin.email
        })
        if (!user) {
            await saveLogin(newLogin);
            await saveUser(newLogin);
            return res.status(201).json(newLogin);
        } else {
            return res.status(201).json('Error registering user');
        }

    } catch (error) {
        console.error('Error saving user to the database:', error);
        return res.status(500).json('Error registering user');
    }
};

export default handleRegister;