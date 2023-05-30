import './App.css';
import spotifyLogo from './spotify_converter/spotify.png';
import arrow from './arrow.png';
import youtubeLogo from './youtube.png';
import { useState } from 'react';



const LogoRow = ({ isSwapped, swapLogos }) => {


  return (
    <div className="logo-row">
      {isSwapped ? (
        <>
          <img src={spotifyLogo} alt="Spotify Logo" className="logo" />
          <img src={arrow} alt="Arrow" className="arrow" />
          <img src={youtubeLogo} alt="YouTube Logo" className="logo" />
        </>
      ) : (
        <>
          <img src={youtubeLogo} alt="YouTube Logo" className="logo" />
          <img src={arrow} alt="Arrow" className="arrow" />
          <img src={spotifyLogo} alt="Spotify Logo" className="logo" />
        </>
      )} 
    </div>
  );
};

export default LogoRow;
