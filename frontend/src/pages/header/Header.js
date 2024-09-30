import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import './Header.css'


function Header() {
  return (
    <>
       <Navbar expand="lg" className="bg-body-primary">
      <Container>
        <Navbar.Brand href="#home">Employee Management System</Navbar.Brand>
        <Navbar.Brand>|</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/">About</Nav.Link>
            <Nav.Link as={Link} to="/">Contact Us </Nav.Link>

           
          </Nav>
          <Nav className="me-right ">
          <Nav.Link as={Link} to="/employee">Add Employee</Nav.Link>
            <Nav.Link >|</Nav.Link>
            <Nav.Link as={Link} to="login">Logout</Nav.Link>
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header
 