import './spotify.css';
import React, {useState} from "react"
import axios from "axios"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

function Spotify() {
  
    const [playlistUrl, setPlaylistUrl] = useState("")
    const [login, setLogin] = useState(false)

    const handleLoginSuccess = (credentialResponse) => {
      console.log(credentialResponse)
      setLogin(true)
    }

    const handleLoginError = () => {
      console.log("Login failed")
    }
  
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
      <div className = "spotify">
        <div className = "spotify-header">
          <div className = "google_login">
          <GoogleOAuthProvider clientId="502841379392-257vs02lfqu6pkd3bg7c2q385ecg0ndp.apps.googleusercontent.com">
            {!login && (
                <GoogleLogin
                onSuccess = {handleLoginSuccess}
                onError = {handleLoginError}
              />
            )}
            {login && (
              <div className = "input_button_container">
                <input type = "text" className = "input" name = "playlistLink" onChange = {handleInputChange}/>
                <button className='button' onClick={sendUrlToBackend}>Submit</button>
              </div>
            )}
        </GoogleOAuthProvider>
        </div>
        </div>
      </div>
    );
  }

  export default Spotify;