import React, { Component } from "react";
import {connect} from 'react-redux';
import { fetchUpdateEmail, fetchDeleteUser, fetchUserInfo } from "../services/utils";
import { Redirect } from 'react-router-dom'

class AccountTab extends Component {

    state = {
        email: "",
        showEmailForm: false,
        updated: false,
        deleted: false,
        logout: false
    }

    componentDidMount = () => {
        fetchUserInfo(localStorage.token)
        .then(r => {
            this.setState({
                email: r.email
            })
            console.log(r.email)
        })
    }

    handleLogout = () => {
        this.props.propsLogout()
        localStorage.clear()
        // this.props.history.push('/')
        this.setState({
            logout: true
        })
    }

    handleEmailChangeButton = () => {
        // this.props.history.push('/changeName')
        // debugger
        this.setState(prevState => ({
            showEmailForm: !prevState.showEmailForm
        }))
    }

    handleEmailChange = ({target}) => {
        this.setState({
            email: target.value
        })
    }

    handleFormSubmit = (evt) => {
        console.log("sending", this.state.email, localStorage.token)
        evt.preventDefault()
        fetchUpdateEmail(this.state.email, localStorage.token)
        .then(resp => {
            console.log(resp)
            // ****** must update global state here *****
            if (resp.message === "Email updated."){
                this.setState({updated: true})
            }
        })
    }

    handleDelete = () => {
        fetchDeleteUser(localStorage.token)
        .then(r => {
            console.log(r)
            
            if (r.message === "User destroyed."){
                localStorage.clear()
                this.setState({
                    deleted: true
                })
            }
        })
        this.props.history.push('/')

    }

    render() {
        let emailForm = 
        this.state.updated ? 
        <p>Email Updated</p>
        :
        <form onSubmit={this.handleFormSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="text" autoComplete="off" name="email" value={this.state.email} onChange={this.handleEmailChange}/>
        <input type="submit" value="Submit"></input>
        </form>

        return(
            <div>
            <button onClick={this.handleEmailChangeButton} >Change Email</button>
            {this.state.showEmailForm? emailForm : ''}
            <br/>
            <button onClick={this.handleLogout} >Log Out</button>
            <br/>
            <button className='delete-button' onClick={this.handleDelete} >Delete Account</button>
            {this.state.deleted? "Account Deleted" : ''}
            {this.state.logout? <Redirect to='/'/> : ''}
            </div>
        )
    }
}

let logout = () => {
    return {
        type: "LOGOUT",
    }
}

let mapDispatchToProps = {
    propsLogout: logout
}

export default connect(null, mapDispatchToProps)(AccountTab)