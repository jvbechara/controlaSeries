import "./style.css";
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Suggestions from '../Menu/Suggestions';
import { isAuthenticated, logout } from "../../services/auth";
import Logo from "../../images/bea5a206de3337ed485a477246bc6b66.png";

export default class Menu extends Component {
    authDisable = () => {
        logout();
    }

    privateHeader = () => {
        if(isAuthenticated() == true){
            return (
                <>
                    <Nav className="mr-auto">
                        <Nav.Link href="/series-status/0">Minha lista</Nav.Link>
                        <Nav.Link href="/series-status/1">Em andamento</Nav.Link>
                        <Nav.Link href="/series-status/2">Assistidas</Nav.Link>
                        <Nav.Link href="/series-create">Adicionar Série</Nav.Link>
                    </Nav>
                    <Nav className="menu-direita">
                        <Form inline>
                        <Suggestions className="sugg"/>
                        </Form>
                        <Nav className='login'>
                            <Nav.Link onClick={this.authDisable} href="/">Logout</Nav.Link>
                        </Nav>
                    </Nav>
                </>
            )
        } else{
            return(<> </>)
        }
    }

    render() {
        return(
            <div className="main-navbar">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand className="logo" href="/"><img src={Logo} alt="logo Genericflix" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="test" id="responsive-navbar-nav">
                    {this.privateHeader()}
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }
}