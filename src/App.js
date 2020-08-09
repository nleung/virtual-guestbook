import React from 'react';
import logo from './logo.svg';
import './App.css';
import Gallery from './components/Gallery'

function App() {
  return (
    <div className="App">
      <img className="Gallery-header-image" src="https://qa-media-api.xogrp.com/images/d0b995a2-0670-4093-ba5b-99611a8c427e~rt_auto-rs_3000.h?ordering=explicit" />
      <div className="Gallery-header">MELISSA & SAMUEL'S GUESTBOOK</div>
      <Gallery/>
    </div>
  );
}

export default App;
