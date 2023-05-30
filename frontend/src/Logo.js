import './App.css';
import spotifyLogo from './spotify_converter/spotify.png';
import arrow from './arrow.png';
import youtubeLogo from './youtube.png';
import { useState } from 'react';
import {Link} from "react-router-dom";

const LogoRow = ({ isSwapped, swapLogos }) => {


  return (
    <div className="logo-row">
          <Link to ="/youtube">
          <img src={youtubeLogo} alt="YouTube Logo" className="ylogo" />
          </Link>
          <p>OR</p>
          <Link to ="/spotify">
          <img src={spotifyLogo} alt="Spotify Logo" className="slogo" />
          </Link>
    </div>
  );
};

export default LogoRow;
