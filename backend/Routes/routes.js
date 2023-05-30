const express = require("express");
const router = express.Router();
const Controller = require("../Controllers/SpotifyControllers.js")


router.route('/get-song-from-playlist').post(Controller.getSpotifyPlaylist);

module.exports = router
