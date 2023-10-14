import registerDatabase from "../mongoSchema/register.mongo.js";
import usersDatabase from '../mongoSchema/signin.mongo.js';


const handleSignin = (bcrypt) => async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('Incorrect form submission');
    }

    const user = await registerDatabase.findOne({
        email,
    }, {
        '_id': 0,
        '__v': 0
    })
    if (user) {
        const isValid = bcrypt.compareSync(password, user.password);
        if (isValid) {
            const validUser = await usersDatabase.findOne({
                email,
            }, {
                '_id': 0,
                '__v': 0
            })
            res.status(201).json(validUser);
        } else {
            res.status(400).json('Wrong Credentials');

        }
    } else {
        res.status(400).json('Wrong Credentials');
    }

}

export default handleSignin;