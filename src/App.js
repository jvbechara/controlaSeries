import React, { Component } from 'react';
import Header from './components/Header';
import './styles.css';
import Routes from './routes';
//import Autocomplete from "./components/Menu/Autocomplete";

const App = () => (
  <div className="container">
    <Header />
    {/* <Autocomplete/> */}
    <Routes />
  </div>
);

export default App;