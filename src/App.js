import React, { Component } from 'react';
import Header from './components/Header';
import './styles.css';
import Routes from './routes';

const App = () => (
  <div className="App" style={{ height:'100%' }}>
    <Header />
    <Routes />
  </div>
);

export default App;