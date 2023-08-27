const mongoose = require('mongoose');

const TopTenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // topGames: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Game',
    //     },
    // ]
    topGames: [{
        name: {
            type: String,
            required: true,
        },
        gameCoverURL:{
            type: String,
        },
        reviewDescription: {
            type: String,
        },
        rank: {
            type: Number,
            required: true,
        }
    }]

});

module.exports = TopTen = mongoose.model('topten', TopTenSchema);