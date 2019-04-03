import React, { Component } from 'react';
import Header from './components/Header';
import './styles.css';
import Routes from './routes';
import "./styles/global";
import { BrowserRouter } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      <Routes />
    </div>
  </ BrowserRouter>

);

export default App;