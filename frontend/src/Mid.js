import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spotify from './spotify_converter/Spotify';
import Youtube from './Youtube';

function Mid() {
    return(
<BrowserRouter>
      <Routes>
          <Route index element={<App/>} />
          <Route path="/spotify" element={<Spotify/>} />
          <Route path="/youtube" element={<Youtube/>} />
      </Routes>
    </BrowserRouter>
    );
}
export default Mid;