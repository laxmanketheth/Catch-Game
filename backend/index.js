const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(
    // {
    //     origin: 'http://localhost:8080',
    //     methods: ['POST', 'GET', 'DELETE'],
    //     credentials: true
    // }
));
app.use(express.json())

dotenv.config();
const port = 8080

const gameScore = require('./model/catchgame');

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connection Successful"))
    .catch((err) => console.log(err))


app.get('/', async (req, res) => {
    try {
        const gameData = await gameScore.find()
        res.json(gameData);
    }
    catch (err) {
        res.json(err)
    }
});

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