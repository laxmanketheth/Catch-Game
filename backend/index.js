const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


console.log('hello');

app.use(cors(
    {
        // origin: 'https://catch-game-frontend.vercel.app',
        // origin:'http://localhost:5173/',
        origin: '*',
        methods: ['POST', 'GET', 'DELETE'],
        credentials: true
    }
));
app.use(express.json())

dotenv.config();
const port = 8080;

const gameScore = require('./model/catchgame');

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connection Successful"))
    .catch((err) => console.log(err))


/**
 * purpose: the purpose of this API is to get all data of the player from the database.
 * Arguments: it takes two arguments (req, res).
 *             res: sends the list of player and their score.
 */
app.get('/', async (req, res) => {
    try {
        const gameData = await gameScore.find();
        res.json(gameData);

    }
    catch (err) {
        res.json(err)
    }
});

/**
 * purpose: the purpose of this API is to save the current score of the player to the database.
 * Arguments: it takes two arguments (req, res).
 *             req: takes an object that contains name and score of the player.
 *             res: sends the saved score object as a response.
 */
app.post('/score', async (req, res) => {
    const newScore = new gameScore(req.body)
    try {
        const savedScore = await newScore.save();
        res.json(savedScore);
    }
    catch (err) {
        res.json(err)
    }
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})