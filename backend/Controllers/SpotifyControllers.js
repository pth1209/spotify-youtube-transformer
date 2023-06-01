const { google } = require("googleapis");
const SpotifyWebApi = require("spotify-web-api-node");
const axios = require("axios");

const createYoutubePlaylist = async (req, res) => {
  const tokenId = req.headers.authorization.split(" ")[1];
  const playlistUrl = req.body.playlistUrl;
  const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
  const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  try {
    const playlistId = playlistUrl.split("/playlist/")[1];
    console.log(playlistId)
    console.log(tokenId)
    // Get Spotify access token
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      method: "post",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            spotifyClientId + ":" + spotifyClientSecret
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        grant_type: "client_credentials",
      },
    };

    const { data } = await axios(authOptions);
    const accessToken = data.access_token;

    // Initialize Spotify Web API client
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);

    // Get the playlist details from Spotify
    const { body: playlistData } = await spotifyApi.getPlaylist(playlistId);

    const name = playlistData.name;
    const tracks = playlistData.tracks.items;

    // Gets the track names and artists from each song
    const trackList = tracks.map((item) => {
      const track = item.track;
      return {
        title: track.name,
        artist: track.artists.map((artist) => artist.name).join(", "),
      };
    });

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: tokenId });

    const youtube = google.youtube({ version: "v3", auth: oauth2Client });
    const playlistTitle = `${name} on Spotify`;

    const { data: playlistInsertData } = await youtube.playlists.insert({
      part: "snippet",
      requestBody: {
        snippet: {
          title: playlistTitle,
        },
      },
    });

    const youtubePlaylistId = playlistInsertData.id;
    const videoIds = await Promise.all(
      trackList.map((track) =>
        searchYouTubeVideoId(track.title, track.artist, youtube)
      )
    );

    await Promise.all(
      videoIds.map((videoId) =>
        youtube.playlistItems.insert({
          part: "snippet",
          requestBody: {
            snippet: {
              playlistId: youtubePlaylistId,
              resourceId: {
                kind: "youtube#video",
                videoId,
              },
            },
          },
        })
      )
    );

    res.json(playlistInsertData);
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({ error: "Failed to create playlist" });
  }
};

const searchYouTubeVideoId = async (title, artist, youtube) => {
  const { data } = await youtube.search.list({
    part: "snippet",
    q: `${title} ${artist}`,
    type: "video",
  });

  return data.items[0].id.videoId;
};

module.exports = { createYoutubePlaylist };
