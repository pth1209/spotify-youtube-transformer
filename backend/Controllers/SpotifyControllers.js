const SpotifyWebApi = require('spotify-web-api-node');
const express = require("express");


async function getYoutubeFromSpotify(req, res) {
    try {
        // Add your code here to get the playlist URL from the request query or request body
        const { id } = req.params

        const spotifyApi = new SpotifyWebApi({
          clientId: process.env.SPOTIFY_CLIENT_ID,
          clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        });


        const { body: { access_token } } = await spotifyApi.clientCredentialsGrant(); // Generate an access token
        spotifyApi.setAccessToken(access_token);


        const { body: { tracks } } = await spotifyApi.getPlaylist(id); // Get the playlist, list of tracks
    
        
        const trackNames = tracks.items.map((item) => item.track.name); // Extract the names from the tracks array
    
        res.send(trackNames); // Send the list of track names as the response
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json('An error occurred');
      }
    }

module.exports = {
    getYoutubeFromSpotify,
}