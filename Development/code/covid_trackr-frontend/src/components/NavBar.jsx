import React from 'react';
import {NavLink} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const NavBar = (props) => {
    console.log(localStorage.token)
    console.log(props)
    // if (localStorage.token){
    return(
        <ul className='nav'>
              <Navbar variant="dark" className='color-nav'>
                {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                <Nav className="mr-auto">
                            <NavLink to="/search" className='nav-link'>Search</NavLink>
                            <NavLink to="/account" className='nav-link'>Account</NavLink>
                </Nav>
                {/* <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                </Form> */}
            </Navbar>
           
        </ul>
    )
    // }
    // else{
    //     return ""
    // }
}

export default NavBar;