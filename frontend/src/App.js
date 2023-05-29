
import Logo from './Logo';
import './App.css';
import Box from './Box';
import SpotyifyFirst from './Logo';
import YTFirst from './Logo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo/>
        <Box/>
      <button className='button' onclick="SpotyifyFirst()">Submit</button>
      <button className='button' onclick="YTFirst()">Submit</button>
      </header>
    </div>
  );
}

export default App;
