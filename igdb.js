const axios = require('axios');

//So we can access the Client-ID & Authorization
const config = require('config');
const clientId = config.get('igdb.Client-ID');
const accessToken = config.get('igdb.Authorization');

const GameForDB = require('./models/GameForDB');

//Retrieve game cover image URL from IGDB API
const getCoverImg = async (gameName) => {
  // first check if the img is already in the database, if so then return it, otherwise call the API
  const result = await GameForDB.findOne({ name: gameName });

  if (result) {
    return result.ImageURL;
  }

  // other wise call the API
  const url = 'https://api.igdb.com/v4/games';
  const body = `search "${gameName}"; fields cover.image_id; limit 1;`;
  const headers = {
    'Client-ID': clientId,
    'Authorization': `Bearer ${accessToken}`,
  };

  //using axios send a HTTP POST request to retrieve img id which we can then put into URL to retrieve the img
  return axios
    .post(url, body, { headers })
    .then((response) => {
      //Extract cover img ID from response
      var coverImgId = response.data[0].cover.image_id;

      //Put the img ID into URL so we can send it back
      var coverImageUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${coverImgId}.jpg`;

      // store the game name and image URL to the database
      const newGameForDB = new GameForDB({
        name: gameName,
        ImageURL: coverImageUrl,
      });

      newGameForDB.save();

      //return img URL
      return coverImageUrl;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

//Find diff of 2 lists (this is so we don't make calls on API for images we already have in database)
//I.e FirstList has Game 1, Game 2... secondList has Game 2, Game 3.. In this case we just call API for Game 3.
//To make it easier firstlist will be old list and second list will be new
async function findDiffInLists(firstList, secondList) {
  if (firstList == null && secondList == null) {
    return;
  }

  //iterate over new list
  for (const item of secondList) {
  }
}

//Export the function
module.exports = getCoverImg;
