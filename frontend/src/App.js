
import Logo from './Logo';
import './App.css';
import Box from './Box';
import SpotyifyFirst from './Logo';
import YTFirst from './Logo';
import React, {useState} from "react"
import axios from "axios"

function App() {

  const [playlistUrl, setPlaylistUrl] = useState("")

  const handleInputChange = (event) => {
      setPlaylistUrl(event.target.value)
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
    <div className="App">
      <header className="App-header">
        <input type = "text" name = "playlistLink" onChange = {handleInputChange}/>
        <button className='button' onClick={sendUrlToBackend}>Submit</button>
      {/* <button className='button' onclick="YTFirst()">Submit</button> */}
      </header>
    </div>
  );
}

export default App;
