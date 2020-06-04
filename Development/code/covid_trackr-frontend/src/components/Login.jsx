import React, { Component } from "react";

export default class Login extends Component {

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                <label htmlFor="username">Username:</label>
                <input type="text" autoComplete="off" name="username" value="" onChange={this.handleChange}/>
                <br/>
                <label htmlFor="password">Password:</label>
                <input type="password" autoComplete="off" name="password" value="" onChange={this.handleChange}/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}