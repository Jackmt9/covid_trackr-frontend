import React, { Component } from "react";
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";

class LoginOrSignup extends Component {
    render() {
        return(
            <>
            <h1>COVID TRACKr</h1>
            <button onClick={() => this.props.history.push(`/login`)}>Log In</button>
            <button onClick={() => this.props.history.push(`/create_account`)}>Sign Up</button>
            </>
        )
    }
}

export default LoginOrSignup