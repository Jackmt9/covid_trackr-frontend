import React from 'react';
import {NavLink} from 'react-router-dom'

const NavBar = (props) => {
    console.log(localStorage.token)
    console.log(props)
    if (localStorage.token){
    return(
        <ul className='nav'>
            <li>
                <NavLink to="/world">World</NavLink>
            </li>
            <li>
                <NavLink to="/search">Search</NavLink>
            </li>
            <li>
                <NavLink to="/bookmarks">Bookmarks</NavLink>
            </li>
            <li>
                <NavLink to="/account">Account</NavLink>
            </li>
        </ul>
    )
    }
    else{
        return ""
    }
}

export default NavBar;