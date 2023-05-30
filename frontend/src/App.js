import Logo from './Logo';
import './App.css';
import React, {useState} from "react"
import axios from "axios"
import Spotify from "./spotify_converter/Spotify"
import {Link} from "react-router-dom"
import spotifyLogo from "./spotify_converter/spotify.png"
import youtubeLogo from "./youtube.png"

function App() {
  
//   const [playlistUrl, setPlaylistUrl] = useState("")

//   const handleInputChange = (event) => {
//       setPlaylistUrl(event.target.value)
//       if (event.target.value.includes('spotify')) {
//         console.log("spotify")
//         SpotyifyFirst()

//       } else if (event.target.value.includes('youtube')) {
//         console.log("youtube")
//         YouTubeFirst()
//       }
//   }

//   const sendUrlToBackend = async () => {
//     console.log(playlistUrl.split('/playlist/')[1])
//     try {
//       const response = await axios.post('/api/get-song-from-playlist', {playlistUrl})
//       console.log(response.data)
//     } catch (error)  {
//       console.log(error)
//     }
//   }

//   const [isSwapped, setIsSwapped] = useState(false);

//   const swapLogos = () => {
//     setIsSwapped(!isSwapped);
//   };
//   const SpotyifyFirst = () => {
//     if(isSwapped){
//         swapLogos()
//     }
// }
// const YouTubeFirst = () => {
//     if(!isSwapped){
//         swapLogos()
//     }
// }

  return (
    <div className="App">
      <header className="App-header">
        <Logo />
      </header>
    </div>
  );
}

export default App;
