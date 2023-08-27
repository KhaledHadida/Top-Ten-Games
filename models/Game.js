const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema([{
    name: {
        type: String,
        required: true,
    },
    reviewDescription: {
        type: String,
    },
    rank:{
        type: Number,
        required: true,
    },
    imgUrl:{
        type: String,
    }
}]);

module.exports = Game = mongoose.model('Game', GameSchema);