const express = require("express");
const router = express.Router();
const SpotifyController = require("../Controllers/SpotifyControllers.js")

router.route('/:id').get(Controller.getYoutubeFromSpotify);
