const express = require("express");
const router = express.Router();
const Controller = require("../Controllers/controllers.js")

router.route('/').get(Controller.getSongFromPlaylist);
