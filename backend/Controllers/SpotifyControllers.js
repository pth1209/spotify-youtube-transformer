const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  // Set your Spotify client ID and client secret here
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});



/**HELPER FUNCTION TO GET PLAYLIST WITH spotifyApi */
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

const getSpotifyPlaylist = (req, res) => {
  const { playlistUrl } = req.body
  // console.log(playlistLink)
  getPlaylistSongs(playlistUrl)
   .then ((songList) => {
    res.json(songList)
   }).catch((error) => {
    console.log(error)
   })
}

module.exports = {
    getSpotifyPlaylist,
}