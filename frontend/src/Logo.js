import './App.css';
import spotifyLogo from './spotify.png';
import arrow from './arrow.png';
import youtubeLogo from './youtube.png';
import { useState } from 'react';



const LogoRow = ({ isSwapped, swapLogos }) => {


  return (
    <div className="logo-row">
          <a href="/youtube">
          <img src={youtubeLogo} alt="YouTube Logo" className="ylogo" />
          </a>
          <p>OR</p>
          <a href="/spotify">
          <img src={spotifyLogo} alt="Spotify Logo" className="slogo" />
          </a>
    </div>
  );
};

export default LogoRow;
