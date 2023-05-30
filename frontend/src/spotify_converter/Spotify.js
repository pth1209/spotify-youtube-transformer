import Logo from '../Logo';
import './spotify.css';
import React, {useState} from "react"
import axios from "axios"

function Spotify() {
  
    const [playlistUrl, setPlaylistUrl] = useState("")
  
    const handleInputChange = (event) => {
        setPlaylistUrl(event.target.value)
    }
  
    const sendUrlToBackend = async () => {
      console.log(playlistUrl.split('/playlist/')[1])
      try {
        const response = await axios.post('/api/create-youtube-playlist', {playlistUrl})
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