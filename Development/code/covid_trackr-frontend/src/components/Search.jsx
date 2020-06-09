import React,{ Component } from "react";
import {fetchLatestStatus, fetchLatestDiff, fetchCountry, fetchCreateBookmark, fetchBookmarks} from '../services/utils'

class Search extends Component {

    state = {
        searchTerm: "",
        listOfDiffs: [],
        listOfStatus: [],
        filter: "Total",
        bookmarks: []
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

        fetchBookmarks(localStorage.token)
        .then(obj => {
            console.log(obj)
            this.setState({bookmarks: obj["bookmarks"]})
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

    filterBySearch = () => {
        let array = this.handleResults().filter(r => r.country.toUpperCase().includes(this.state.searchTerm.toUpperCase()))
        return array.sort(function(a, b){
            if(a.country < b.country) { return -1; }
            if(a.country > b.country) { return 1; }
            return 0;
        })
    }

    fullOrEmptyStar = (country_id) => {
        let star = "☆"
        this.state.bookmarks.map(e => {
            if (e["country_id"] === country_id){
                star = "⭑"
            }
        })
        return star
    }

    makeTableRow = (row) => {
        // console.log(row)
        if (this.state.filter === "Total") {
        return (
            <tr key={row["country"]}>
                <td onClick={(evt) => this.handleBookmark(evt, row["id"])}>{this.fullOrEmptyStar(row["id"])}</td>
                <td>{row["country"]}</td>
                <td>{row["cases"]}</td>
                <td>{row["deaths"]}</td>
                <td>{row["recovered"]}</td>
            </tr>
        )
        } else {
            return (
                <tr key={row["country"]}>
                    <td onClick={(evt) => this.handleBookmark(evt, row["id"])}>{this.fullOrEmptyStar(row["id"])}</td>
                    <td>{row["country"]}</td>
                    <td>{row["new_cases"]}</td>
                    <td>{row["new_deaths"]}</td>
                    <td>{row["new_recovered"]}</td>
                </tr>
            )
        }
    }

    handleBookmark = (evt, id) => {
        evt.target.innerText = "⭑"
        // debugger
        // // handle fetch and unclicking
        // const country = evt.target.nextElementSibling.innerText
        // console.log(country)
        console.log(id)
        const token = localStorage.token
        fetchCreateBookmark(id, token)
        .then(obj => {
            console.log(obj)
        })

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

                        {this.filterBySearch().map(r => this.makeTableRow(r))}
                    </tbody>
                </table>
            </>
        )
    }
}

export default Search


