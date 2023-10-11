import axios from 'axios';

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


export const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries)
        })
        .catch(err => res.status(400).json('Enable to get entries'));
}