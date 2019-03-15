import "./style.css";
import React, { Component } from 'react';

const Menu = () => (
    <nav id="menu">
        <div className='toolbar'>
            { <ul>
                <li><a href="/series-status/0">Minha Lista</a></li>
                <li><a href="/series-status/1">Em Andamento</a></li>
                <li><a href="/series-status/2">Assistidas</a></li>
            </ul> }
        </div>
    </nav>
);

export default Menu;