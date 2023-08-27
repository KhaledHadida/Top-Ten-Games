const axios = require('axios');

//So we can access the Client-ID & Authorization
const config = require('config');

const clientId = config.get('igdb.Client-ID');
const accessToken = config.get('igdb.Authorization');

//Retrieve game cover image URL from IGDB API
async function getCoverImg(gameName){

    try{
        //using axios send a HTTP POST request to retrieve img id which we can then put into URL to retrieve the img
        var response = await axios.post(
            'https://api.igdb.com/v4/games',
            'search "${gameName}"; fields cover.image_id; limit 1;',
            {
                headers: {
                    'Client-ID': clientId,
                    'Authorization': `Bearer ${accessToken}`,
                  }, 
            }
        );
        //Extract cover img ID from resp
        var coverImgId = response.data[0].cover.image_id;
        
        //Put the img ID into URL so we can send it back
        var coverImageUrl = 'https://images.igdb.com/igdb/image/upload/t_cover_big/${coverImageId}.jpg'
        //return img URL
        return coverImageUrl;
    }catch(err){
        console.log(`Ok ${response[0]}`);
        console.log(coverImageUrl);
        console.error('Error retrieving game cover image:', err);
        throw new Error('Failed to retrieve game cover image');    
    }
}

//Find diff of 2 lists (this is so we don't make calls on API for images we already have in database)
//I.e FirstList has Game 1, Game 2... secondList has Game 2, Game 3.. In this case we just call API for Game 3.
//To make it easier firstlist will be old list and second list will be new 
async function findDiffInLists(firstList, secondList){
    if(firstList == null && secondList == null){
        return;
    }
    
    //iterate over new list
    for(const item of secondList){

    }
}


//Export fns
module.exports = {
    getCoverImg,
};