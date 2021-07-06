import React from 'react';
import './App.css';
import Gallery from './components/Gallery'

function App() {
  return (
    <div className="App">
      <div className="Gallery-header">
        <div className="Gallery-header-text">TIFFANY & MICHAEL'S GUESTBOOK</div>
      </div>
      <Gallery/>
    </div>
  );
}

export default App;
