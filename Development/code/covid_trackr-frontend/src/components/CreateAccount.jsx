import React, { Component } from "react";
import { fetchCreateUser } from '../services/utils'

export default class CreateAccount extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        "subscribed?": false,
        username: '',
        password: ''
    }

    handleChange = ({target}) => {
        const value = target.name === 'subscribed?' ? target.checked : target.value;
        // debugger
        
        this.setState({
            [target.name]: value
        })
        console.log(this.state)
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        const user = this.state
        // handle submit to backend here.
        console.log(user)
        fetchCreateUser(user)
        .then(r => console.log(r))

    }

    render() {
        return(
        <form onSubmit={this.handleSubmit}>
            <h1>Create Account</h1>
            <label htmlFor="first_name">First Name:</label>
            <input type="text" autoComplete="off" name="first_name" value={this.state.first_name} onChange={this.handleChange}/>
            <br/>
            <label htmlFor="last_name">Last Name:</label>
            <input type="text" autoComplete="off" name="last_name" value={this.state.last_name} onChange={this.handleChange}/>
            <br/>
            <label htmlFor="email">Email:</label>
            <input type="text" autoComplete="off" name="email" value={this.state.email} onChange={this.handleChange}/>
            <br/>
            <input type="checkbox" checked={this.state["subscribed?"]} name="subscribed?" onChange={this.handleChange}/>
            <label htmlFor="subscribed?">Subscribe To Emails</label>
            <br/>
            <label htmlFor="username">Username:</label>
            <input type="text" autoComplete="off" name="username" value={this.state.username} onChange={this.handleChange}/>
            <br/>
            <label htmlFor="password">Password:</label>
            <input type="text" autoComplete="off" name="password" value={this.state.password} onChange={this.handleChange}/>
            <br/>
            <input type="submit" value="Create Account"/>
        </form>
        )
    }
}