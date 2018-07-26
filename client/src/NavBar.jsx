import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
    return (
        <div className="NavBar">
            <Link className="NavItem" to="/">Home</Link>
            {props.currentUser
                ? (
                    <Fragment>
                        <Link className="NavItem" to="/create">Create</Link>
                        <Link className="NavItem" to="/mysynths">My Synths</Link>
                        <Link className="NavItem" to="/settings">Settings</Link>
                        <Link className="NavItem" to="/logout">Log Out</Link>
                    </Fragment>
                )
                : (
                    <Fragment>
                        <Link className="NavItem" to="/login">Log In</Link>
                        <Link className="NavItem" to="/signup">Sign Up</Link>
                    </Fragment>
                )
            }
        </div>
    )
}

export default NavBar
