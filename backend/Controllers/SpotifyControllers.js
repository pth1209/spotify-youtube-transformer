const SpotifyWebApi = require('spotify-web-api-node');
const { google } = require("googleapis");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
}); // Set Spotify client ID and client secret

const createYoutubePlaylist = async (req, res) => {

  const { tokenId, playlistUrl } = req.body;

  // NEED TO DOUBLE CHECK THAT THIS GENERATES CORRECT AUTHENTICATION 
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: tokenId });

  try{
    const playlistId = playlistUrl.split('/playlist/')[1];
    const { body: { name, tracks } } = await spotifyApi.getPlaylist(playlistId);


    // Gets the track names and artists from each song 
    const trackList = tracks.items.map((item) => { // tracklist will be object of title and artist to search
      const track = item.track;
      return {
        title: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
      };
    });

    
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    const playlistTitle = `${name} on Spotify`;

    const { data } = await youtube.playlists.insert({
      part: 'snippet',
      requestBody: {
        snippet: {
          title: playlistTitle,
        },
      },
    }); // creates the playlist with the respective fields


    const youtubePlaylistId = data.id; // gonna use later for inserting into playlist
    const videoIds = await Promise.all(trackList.map(
      (track) => searchYouTubeVideoId(track.title, track.artist)));

    await Promise.all(videoIds.map((videoId) => { // goes through each id from abovr and inserts
        return youtube.playlistItems.insert({
          part: 'snippet',
          requestBody: {                    // CODE TO INSERT PLAYLIST FROM THE GOOGLE YOUTUBE API
            snippet: {
              youtubePlaylistId,
              resourceId: {
                kind: 'youtube#video', 
                videoId,
              },
            },
          },
        });
      }));

      res.json(data);

  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ error: 'Failed to create playlist' });
  }

}

// A little wonky but i think this works to find the FIRST video on youtube

// Might need to figure out some verifcaiton to see if its correct video
const searchYouTubeVideoId = async (title, artist) => {
  const youtube = google.youtube({ version: 'v3' });

  const { data } = await youtube.search.list({
    part: 'snippet',
    q: `${title} ${artist}`,
    type: 'video',
  });

  return data.items[0].id.videoId;
};

module.exports = {createYoutubePlaylist}