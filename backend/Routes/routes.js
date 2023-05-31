const express = require("express");
const router = express.Router();
const {createYoutubePlaylist} = require("../Controllers/SpotifyControllers.js")


router.post('/', createYoutubePlaylist);

module.exports = router
