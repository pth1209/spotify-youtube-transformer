const { google } = require("googleapis");
const axios = require('axios');

const createYoutubePlaylist = async (req, res) => {
  const tokenId = req.body.accessToken;
  const playlistUrl = req.body.playlistUrl;
  const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
  const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  try {
    const playlistId = playlistUrl.split('/playlist/')[1];

    // Get Spotify access token
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(spotifyClientId + ':' + spotifyClientSecret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        grant_type: 'client_credentials'
      }
    };

    const { data } = await axios(authOptions);
    const accessToken = data.access_token;

    // Use the access token to make requests to Spotify Web API
    const playlistResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });

    const playlistData = playlistResponse.data;
    const name = playlistData.name;
    const tracks = playlistData.tracks;

    // Gets the track names and artists from each song
    const trackList = tracks.items.map((item) => {
      const track = item.track;
      return {
        title: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
      };
    });

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: tokenId });

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    const playlistTitle = `${name} on Spotify`;

    const { data: playlistInsertData } = await youtube.playlists.insert({
      part: 'snippet',
      requestBody: {
        snippet: {
          title: playlistTitle,
        },
      },
    });

    const youtubePlaylistId = playlistInsertData.id;
    const videoIds = await Promise.all(trackList.map(
      (track) => searchYouTubeVideoId(track.title, track.artist, youtube)
    ));

    await Promise.all(videoIds.map((videoId) => {
      return youtube.playlistItems.insert({
        part: 'snippet',
        requestBody: {
          snippet: {
            playlistId: youtubePlaylistId,
            resourceId: {
              kind: 'youtube#video',
              videoId,
            },
          },
        },
      });
    }));

    res.json(playlistInsertData);
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ error: 'Failed to create playlist' });
  }
};

const searchYouTubeVideoId = async (title, artist, youtube) => {
  const { data } = await youtube.search.list({
    part: 'snippet',
    q: `${title} ${artist}`,
    type: 'video',
  });

  return data.items[0].id.videoId;
};

module.exports = { createYoutubePlaylist };
