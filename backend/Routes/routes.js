const express = require("express");
const router = express.Router();
const Controller = require("../Controllers/SpotifyControllers.js")


router.route('/create-youtube-playlist').post(Controller.createYoutubePlaylist);

module.exports = router
