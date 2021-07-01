import React from 'react';
import './App.css';
import Gallery from './components/Gallery'

function App() {
  return (
    <div className="App">
      <img className="Gallery-header-image" src="https://qa-media-api.xogrp.com/images/d0b995a2-0670-4093-ba5b-99611a8c427e~rt_auto-rs_3000.h?ordering=explicit" alt="Header" />
      <div className="Gallery-header">TIFFANY & MICHAEL'S GUESTBOOK</div>
      <Gallery/>
    </div>
  );
}

export default App;
