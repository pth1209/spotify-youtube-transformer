const express = require("express");
// const router = require("../../pracApp/backend/routes/workouts");
const axios = require('axios');
require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

// app.use("/api", router)
app.use(express.json())


// Create an instance of the SpotifyWebApi class
const spotifyApi = new SpotifyWebApi({
  // Set your Spotify client ID and client secret here
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const getPlaylistSongs = async (playlistLink) => {
    try {
      // Extract the playlist ID from the link
      const playlistId = playlistLink.split('/playlist/')[1];
  
      // Retrieve an access token
      const { body: { access_token } } = await spotifyApi.clientCredentialsGrant();
  
      // Set the access token for making authenticated API requests
      spotifyApi.setAccessToken(access_token);
  
      // Get the playlist details, including the list of tracks
      const { body: { tracks } } = await spotifyApi.getPlaylist(playlistId);
  
      // Extract the relevant information from the tracks array
      const songList = tracks.items.map((item) => {
        const track = item.track;
        return {
          title: track.name,
          artist: track.artists.map((artist) => artist.name).join(', '),
          length: track.duration_ms,
        };
      });
  
      // Return the list of songs
      return songList;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
// Call the function with the Spotify playlist link
getPlaylistSongs('https://open.spotify.com/playlist/0cwXqzMX0Y9EZCUlGJoEPR?si=3b1jn3OZQXKS-bMGsw7oGA&nd=1&utm_medium=organic&_branch_referrer=H4sIAAAAAAAAA72NXQuCMBiFf828y69FUSAhpUIhfRGYNzGn5vJtW24i9uvToL8QnIvDeXg4ldZSLS1LSaFZ2ZtEShMYr62VbETeUu0JWXADudOyBbi1DXjVqCDsIzccMmLzZ1PxHCYJpAem9FBt2iWvd5zY10WQri8QbUVwOCEcKobwBmfOg%2BN9ekx250kWR6qbi8j%2FnhGAjND6L4fInfF8oI5RFkS3TeGJ5k44ox9DWranHQEAAA%3D%3D&product=open&%24full_url=https%3A%2F%2Fopen.spotify.com%2Fplaylist%2F0cwXqzMX0Y9EZCUlGJoEPR%3Fsi%3D3b1jn3OZQXKS-bMGsw7oGA&feature=organic&_branch_match_id=1181729234519595532')
    .then((songList)=> {
        console.log('Playlist Songs:', songList)
    }).catch((error) =>{
        console.error(error);
    })



app.listen(process.env.PORT, ()=>{
    console.log(`LISTENING ON PORT`);
})
