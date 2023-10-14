import axios from 'axios';
import usersDatabase from '../mongoSchema/signin.mongo.js';


export const handleApiCall = (req, res) => {
    axios.get('https://api.sightengine.com/1.0/check.json', {
        params: {
            'url': req.body.input,
            'models': 'face-attributes',
            'api_user': 972725277,
            'api_secret': 'yXRQkB95X8DCiN7VWFwh',
        }
    })
        .then(response => res.json(response.data))
        .catch(err => res.status(400).json('unable to work with API'))
}


export const handleImage = async (req, res) => {
    const { id } = req.body;

    try {
        const update = { $inc: { entries: 1 } };

        const result = await usersDatabase.updateOne({ id }, update);

        if (result.modifiedCount === 1) {
            const user = await usersDatabase.findOne({ id });
            res.status(201).json(user.entries);
        } else {
            res.status(400).json('Unable to update entries');
        }
    } catch (error) {
        console.error('Error updating entries:', error);
        res.status(500).json('Error updating entries');
    }
};
