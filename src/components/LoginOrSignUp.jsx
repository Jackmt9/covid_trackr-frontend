import React, { Component } from "react";

class LoginOrSignup extends Component {
    render() {
        return(
            <>
            <button className='ls-button' onClick={() => this.props.history.push(`/login`)}>Log In</button>
            {/* <br/> */}
            <button className='ls-button' onClick={() => this.props.history.push(`/create_account`)}>Sign Up</button>
            </>
        )
    }
}

export default LoginOrSignup