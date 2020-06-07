import React, { Component } from "react";
import {connect} from 'react-redux'
import {fetchLoginUser} from '../services/utils'

class Login extends Component {


    state = {
        username: "",
        password: ""
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        fetchLoginUser(this.state)
        // .then(resp => this.handleResponse(resp)) 
        .then((loggedInUser) => {
            this.handleResponse(loggedInUser)
        })
    }

    handleResponse = (resp) => {
        if (resp.message) {
            alert(resp.message)
        } else {
            localStorage.token = resp.token
            this.props.propsAddUser(resp)
            this.props.history.push('/account')
            console.log(resp)
        }
    }




    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                <label htmlFor="username">Username:</label>
                <input type="text" autoComplete="off" name="username" value={this.state.username} onChange={this.handleChange}/>
                <br/>
                <label htmlFor="password">Password:</label>
                <input type="password" autoComplete="off" name="password" value={this.state.value} onChange={this.handleChange}/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}

let loggedInUser = (resp) => {
    let user = resp.user
    return {
        type: "ADD_USER",
        payload: user
    }
}

let mapDispatchToProps = {
    propsAddUser: loggedInUser
}

export default connect(null, mapDispatchToProps)(Login)