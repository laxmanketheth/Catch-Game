const mongoose = require('mongoose');

const gameScoreSchema = new mongoose.Schema(
    {
        playerName:{type: String, required: true},
        score:{type: Number, required: true}
})
module.exports = mongoose.model('gameScore', gameScoreSchema);