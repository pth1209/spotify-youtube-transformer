import './App.css';
import spotifyLogo from './spotify.png';
import arrow from './arrow.png';
import youtubeLogo from './youtube.png';
let firstLogo=spotifyLogo;
let secondLogo=youtubeLogo;

function YTFirst(){
    firstLogo=youtubeLogo;
    secondLogo=spotifyLogo;
}
function SpotifyFirst(){
    firstLogo=spotifyLogo;
    secondLogo=youtubeLogo;
}


function Logo() {
    return (
        <>
        <div className='row'>
            <div className='column'>
        <img src={firstLogo} alt="logo" />
        </div>
        <div className='column'>
        <img src={arrow} alt="logo" className='apach' />
        </div>
        <div className='column'>
        <img src={secondLogo} alt="logo" />
        </div>
        </div>

        </>
    );
  }
  
  export default Logo;
