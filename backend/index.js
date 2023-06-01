const express = require("express");
require('dotenv').config();
const app = express();
const router = require("./Routes/routes.js");

app.use(express.json());

// app.use('/api/create-youtube-playlist', router);// Mount the router at the '/api' base URL path


app.post('/api/create-youtube-playlist', (req, res) => {
    try {
  const {playlistUrl} =  req.body;
  const accessToken = req.headers.authorization.split(' ')[1];
  console.log(playlistUrl)
  console.log(accessToken);
    } catch (error) {
      res.status(500).json({error: error})
    }
  })


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

