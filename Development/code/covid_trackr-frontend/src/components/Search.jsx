import React,{ Component } from "react";
import {fetchLatestStatus, fetchLatestDiff, fetchCountry} from '../services/utils'

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
            obj = this.handleObj(obj)
            this.setState({listOfDiffs: obj})
        })

        fetchLatestStatus()
        .then(obj => {
            obj = this.handleObj(obj)
            this.setState({listOfStatus: obj})
        })
    }

    handleObj = (obj) => {
        obj.map(e => {
            fetchCountry(e.country)
            .then(countryE => {
                // console.log(countryE)
                e.country = countryE.name
                e.id = countryE.id
            })
        })
        return obj
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
        console.log(this.state)
    }

    handleResults = () => {
        switch(this.state.filter){
            case "Total":
                return this.state.listOfStatus
            case "Today":
                return this.state.listOfDiffs
            default:
                return this.listOfStatus
        }
    }


    makeTableRow = (row) => {
        // console.log(row)
        if (this.state.filter === "Total") {
        return (
            <tr key={row["id"]}>
                <td onClick={this.handleBookmark}>☆</td>
                <td>{row["country"]}</td>
                <td>{row["cases"]}</td>
                <td>{row["deaths"]}</td>
                <td>{row["recovered"]}</td>
            </tr>
        )
        } else {
            return (
                <tr key={row["id"]}>
                    <td onClick={this.handleBookmark}>☆</td>
                    <td>{row["country"]}</td>
                    <td>{row["new_cases"]}</td>
                    <td>{row["new_deaths"]}</td>
                    <td>{row["new_recovered"]}</td>
                </tr>
            )
        }
    }

    handleBookmark = (evt) => {
        evt.target.innerText = "⭑"
        debugger
        // handle fetch and unclicking
        const country = evt.target.nextElementSibling.innerText
        console.log(country)
        // console.log(id)

    }

    render() {
        return(
            <>
                <label htmlFor="Search">Search:</label>
                <input type="text" autoComplete="off" name="search" value={this.state.searchTerm} onChange={this.handleChange}/>
                <button onClick={this.handleTotalClick}>Total</button>
                <button onClick={this.handleTodayClick}>Today</button>
                <table>
                    <tbody>
                        <tr>
                            <th><h1>Bookmark</h1></th>
                            <th><h1>Country</h1></th>
                            <th><h1>Cases</h1></th>
                            <th><h1>Deaths</h1></th>
                            <th><h1>Recovered</h1></th>
                        </tr>

                        {this.handleResults().map(r => this.makeTableRow(r))}
                    </tbody>
                </table>
            </>
        )
    }
}

export default Search


