import React,{ Component } from "react";
import {fetchLatestStatus, fetchLatestDiff} from '../services/utils'

class Search extends Component {

    state = {
        searchTerm: "",
        listOfDiffs: [],
        listOfStatus: [],
        filter: "Total"
    }

    componentDidMount = () => {
        fetchLatestDiff()
        .then(obj => {
            this.setState({listOfDiffs: obj})
        })

        fetchLatestStatus()
        .then(obj => {
            this.setState({listOfStatus: obj})
        })
    }

    handleChange= ({target}) => {
        this.setState({searchTerm: target.value })
        console.log(this.state)
    }

    handleTotalClick = () => {
        this.setState({filter: "Total"})
    }

    handleTodayClick = () => {
        this.setState({filter: "Today"})
    }

    handleResults = () => {
        switch(this.state.filter){
            case "Total":
                return this.state.listOfStatus
            case "Today":
                return this.state.listOfDiffs
        }
    }
    
    render() {
        let results = this.handleResults().forEach(r => 
            {return <li key={r.key}>r</li>}
        )
        return(
            <div>
                <label htmlFor="Search">Search:</label>
                <input type="text" autoComplete="off" name="search" value={this.state.searchTerm} onChange={this.handleChange}/>
                <button onClick={this.handleTotalClick}>Total</button>
                <button onClick={this.handleTodayClick}>Today</button>
                <ul>
                    {/* RESULTS NOT RENDERING PROPERLY */}
                    {results}
                </ul>
            </div>
        )
    }
}

export default Search