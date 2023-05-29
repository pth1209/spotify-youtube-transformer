import './App.css';
import spotifylogo from './spotify.png';
import arrow from './arrow.png';
let firstLogo=spotifylogo;
let secondLogo=spotifylogo;

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
  
