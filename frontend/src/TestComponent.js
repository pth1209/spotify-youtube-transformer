import React from 'react'
import { useState } from "react";
import axios from "axios";

import { GoogleLogin } from '@react-oauth/google';
export default function TestComponent() {
  
    
   
      const [url, setUrl] = useState("");
      const [initialLogin, setInitialLogin] = useState(false);
      const [resultUrl, setResultUrl] = useState("");
    
      const handleChange = (event) => {
        setUrl(event.target.value);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        setInitialLogin(true);
      };
    
      const handleLoginSuccess = (tokenId, urll) => {
        axios
          .post("/api/create-youtube-playlist", { tokenId, playlistUrl: urll })
          .then((response) => {
            console.log("YouTube Playlist created:", response.data);
            const playlistId = response.data.id;
            const generatedUrl = `https://www.youtube.com/playlist?list=${playlistId}`;
            setResultUrl(generatedUrl);
          })
          .catch((error) => {
            console.error("Error creating YouTube playlist:", error);
          });
      };
    
      const handleLoginFailure = () => {
        console.error("Login failed");
      };
    
      return (
        <div className="App">
          <form onSubmit={handleSubmit}>
            <label>
              Spotify Playlist URL:
              <input type="text" value={url} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
          {initialLogin && (
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onFailure={handleLoginFailure}
              playlistUrl={url}
            />
          )}
          {resultUrl && <p>YouTube Playlist URL: {resultUrl}</p>}
        </div>
      );
    };

