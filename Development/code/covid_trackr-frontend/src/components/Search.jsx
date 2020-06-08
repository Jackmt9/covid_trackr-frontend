import React,{ Component } from "react";
import {fetchLatestStatus, fetchLatestDiff} from '../services/utils'

class Search extends Component {

    state = {
        searchTerm: "",
        listOfDiffs: [],
        listOfStatus: []
    }

    componentDidMount = () => {
        fetchLatestDiff().then(latestDiffs => {
            // fetchLatestStatus().then(latestStatus => {
                this.setState({
                    listOfDiffs: latestDiffs,
                    // listOfStatus: latestStatus
                // })
            })
        })

    }

    handleChange= ({target}) => {
        this.setState({searchTerm: target.value })
    }

    render() {
        return(
            <div>
                <label htmlFor="Search">Search:</label>
                <input type="text" autoComplete="off" name="search" value={this.state.searchTerm} onChange={this.handleChange}/>
            </div>
        )
    }
}

export default Search