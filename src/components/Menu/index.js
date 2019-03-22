import "./style.css";
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Suggestions from '../Menu/Suggestions';

export default class Menu extends Component {
    render() {
        return(
            <div className="main-navbar">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand className="logo" href="/"><p>Minhas Séries</p></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/series-status/0">Minha lista</Nav.Link>
                        <Nav.Link href="/series-status/1">Em andamento</Nav.Link>
                        <Nav.Link href="/series-status/2">Assistidas</Nav.Link>
                        <Nav.Link href="/series-create">Adicionar Série</Nav.Link>
                    </Nav>
                    <Nav>
                        <Form inline>
                        <Suggestions className="sugg"/>
                        {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button> */}
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }
}