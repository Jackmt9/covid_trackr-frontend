import React, { Component } from "react";
import {connect} from 'react-redux';
import { fetchUpdateEmail } from "../services/utils";

class AccountTab extends Component {

    state = {
        email: "",
        showEmailForm: false,
        updated: false
    }

    handleLogout = () => {
        this.props.propsLogout()
        localStorage.clear()
        this.props.history.push('/')
    }

    handleEmailChangeButton = () => {
        // this.props.history.push('/changeName')
        // debugger
        this.setState(prevState => ({
            showNameForm: !prevState.showEmailForm
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

    render() {
        let emailForm = 
        this.state.updated ? 
        "Email Updated"
        :
        <form onSubmit={this.handleFormSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="text" autoComplete="off" name="email" value={this.state.name} onChange={this.handleEmailChange}/>
        <input type="submit" value="Submit"></input>
        </form>

        return(
            <div>
            <button onClick={this.handleEmailChangeButton} >Change Email</button>
            {this.state.showNameForm? emailForm : ''}
            <br/>
            <button onClick={this.handleLogout} >Log Out</button>
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