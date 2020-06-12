import React, { Component } from "react";
import {fetchBookmarks} from '../services/utils'

class BookmarkTab extends Component {
    state = {
        bookmarks: []
    }
    
    componentDidMount = () => {
        fetchBookmarks(localStorage.token)
        .then(obj => {
            console.log(obj)
            
            this.setState({bookmarks: obj["bookmarks"]})
        })
    }
    render() {
        return(
            <h1>hello from bookmarkTab</h1>
        )
    }
}

export default BookmarkTab