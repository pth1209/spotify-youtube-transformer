import Logo from '../Logo';
import './spotify.css';
import Box from '../Box';
import SpotyifyFirst from '../Logo';
import YouTubeFirst from '../Logo';
import React, {useState} from "react"
import axios from "axios"
import swapLogo from '../Logo';

function Spotify() {
  
    const [playlistUrl, setPlaylistUrl] = useState("")
  
    const handleInputChange = (event) => {
        setPlaylistUrl(event.target.value)
        if (event.target.value.includes('spotify')) {
          console.log("spotify")
          SpotyifyFirst()
  
        } else if (event.target.value.includes('youtube')) {
          console.log("youtube")
          YouTubeFirst()
        }
    }
  
    const sendUrlToBackend = async () => {
      console.log(playlistUrl.split('/playlist/')[1])
      try {
        const response = await axios.post('/api/get-song-from-playlist', {playlistUrl})
        console.log(response.data)
      } catch (error)  {
        console.log(error)
      }
    }
  
    return (
      <div className="spotify">
        <header className="spotify-header">
          <div className = "input_button_container">
            <input type = "text" className = "input" name = "playlistLink" onChange = {handleInputChange}/>
            <button className='button' onClick={sendUrlToBackend}>Submit</button>
          </div>
        </header>
      </div>
    );
  }

  export default Spotify;