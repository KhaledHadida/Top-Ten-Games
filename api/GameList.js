//This api endpoint is for saving the user's top 10 games 
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// Import the IGDB functions
const { getCoverImg } = require('../igdb');

//import user & topten model
const User = require('../models/User');
const TopTen = require('../models/TopTen');

//create top 10 games list
router.post('/', auth,
  check('gameList', 'Please pick your top games').optional().isArray(),
  async (req, res) => {

    //validation (if we have empty array)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Fetch array of games and the user ID
    let gameList = req.body.gameList;

    //Limit to up to 10 only in case we get above 10 games by user
    gameList = gameList.slice(0, 10);
    //Get user from DB 
    try {
      //fetch user while excluding password for protection (using auth middleware)
      const user = await User.findById(req.user.id).select('-password');

      //Search up if user exists in the GameList DB 
      let currentGameList = await TopTen.findOne({ user: req.user.id });

      //fetch the image URL
      var img = getCoverImg("The Witcher 3: Wild Hunt");

      if (currentGameList) {
        // If the record exists, update the gameList in the DB
        currentGameList.topGames = gameList;

      } else {
        //otherwise create the topten 
        currentGameList = new TopTen({
          user: req.user.id,
          topGames: gameList,
          imgUrl: img
        });
      }

      //Save it
      await currentGameList.save();

      // Send a success response
      res.json({ message: 'Top 10 games saved successfully' });


    } catch (err) {
      //if we get an error in process
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });


//Get user's gameList by the user's id
router.get('/:id', async (req, res) => {
  try {
    const userGameList = await TopTen.findOne({ user: req.params.id });
    if(!userGameList){
      return res.status(404).json({ msg: 'Game list not found' });
    }
    res.json(userGameList.topGames);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;