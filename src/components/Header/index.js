import React from 'react';
import "./styles.css";
import Menu from '../Menu';

const Header = () => (
    <div className="menu-header">
        <header>  
            {/* <div className="logo"><a href="/"> <h1>Minhas Séries</h1></a></div> */}
            <Menu />
        </header>
    </div>
);

export default Header;