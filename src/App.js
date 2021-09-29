import React from 'react';
import './App.css';
import Forecast from "./components/Forecast/Forecast";
import weatherImage from './images/weather.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img style={{width:'200px', height:'200px'}} src={weatherImage} alt='weather' />
        <h1>React Weather App</h1>
      </header>
      <main>
        <Forecast />
      </main>
      <footer>
        © Shawn Mathias, 2021
      </footer>
    </div>
  );
}

export default App;
