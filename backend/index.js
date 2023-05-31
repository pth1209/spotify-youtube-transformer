const express = require("express");
require('dotenv').config();
const app = express();
const router = require("./Routes/routes.js");

app.use(express.json());

app.use('/api/create-youtube-playlist', router); // Mount the router at the '/api' base URL path

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

