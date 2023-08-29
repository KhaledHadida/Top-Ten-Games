//This api endpoint is for saving the user's top 10 games
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// Import the IGDB functions
const getCoverImg = require('../igdb');

//import user & topten model
const User = require('../models/User');
const TopTen = require('../models/TopTen');

// @route    POST api/gameList
// @desc     Add a game to the game list
// @access   Private
router.post(
  '/addGame',
  auth,
  check('name', 'Please enter a game name').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      // if no user found
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const gameList = await TopTen.findOne({ user: req.user.id });

      // if the game already exists in the list, return an error
      if (
        gameList.topGames.filter(
          (game) => game.name.toLowerCase() === req.body.name.toLowerCase()
        ).length > 0
      ) {
        return res.status(400).json({ msg: 'Game already in the list' });
      }

      // fetch the game cover image URL
      const coverImageUrl = await getCoverImg(req.body.name);

      // add the game to the game list
      // rank is automatically added based on the number of games in the list, so it will always be the last one
      const newGame = {
        name: req.body.name,
        gameCoverURL: coverImageUrl,
        reviewDescription: req.body.reviewDescription,
        rank: gameList.topGames.length + 1,
      };

      gameList.topGames.push(newGame);

      // save the game list
      await gameList.save();

      res.json(gameList.topGames);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/gameList
// @desc     Create a list of top 10 games
// @access   Private
/*
router.post(
  '/',
  auth,
  // check('gameList', 'Please pick your top games').optional().isArray(),
  async (req, res) => {
    //validation (if we have empty array)
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    //Fetch array of games and the user ID
    // let gameList = req.body.gameList;

    //Limit to up to 10 only in case we get above 10 games by user
    // gameList = gameList.slice(0, 10);

    try {
      //fetch user while excluding password for protection (using auth middleware)
      const user = await User.findById(req.user.id).select('-password');

      //Search up if user exists in the GameList DB
      let currentGameList = await TopTen.findOne({ user: req.user.id });

      // Create a new topten
      const newTopTen = new TopTen({
        user: req.user.id,
      });

      // Save the topten
      const topTen = await newTopTen.save();

      // Send a success response
      res.json(topTen);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

    //   //fetch the image URL
    //   var img = getCoverImg('The Witcher 3: Wild Hunt');

    //   if (currentGameList) {
    //     // If the record exists, update the gameList in the DB
    //     currentGameList.topGames = gameList;
    //   } else {
    //     //otherwise create the topten
    //     currentGameList = new TopTen({
    //       user: req.user.id,
    //       topGames: gameList,
    //       imgUrl: img,
    //     });
    //   }

    //   //Save it
    //   await currentGameList.save();

    //   // Send a success response
    //   res.json({ message: 'Top 10 games saved successfully' });
    // } catch (err) {
    //   //if we get an error in process
    //   console.error(err.message);
    //   res.status(500).send('Server error');
    // }
  }
);
*/

//Get user's gameList by the user's id
router.get('/:id', async (req, res) => {
  try {
    const userGameList = await TopTen.findOne({ user: req.params.id });
    if (!userGameList) {
      return res.status(404).json({ msg: 'Game list not found' });
    }
    res.json(userGameList.topGames);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
