import React from 'react';
import { Nav } from 'react-bootstrap';


export const NavBar = () => {
    return (
        <Nav className="justify-content-center" activeKey="/home">
                <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link href="/about">About</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link href="/Folio">Portfolio</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link href="/contact">Contact</Nav.Link>
                </Nav.Item>
                </Nav>
    )
}