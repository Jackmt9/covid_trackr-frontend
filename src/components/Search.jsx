import React,{ Component } from "react";
import {fetchLatestStatus, fetchLatestDiff, fetchCountry, fetchCreateBookmark, fetchBookmarks, fetchDeleteBookmark} from '../services/utils'

class Search extends Component {

    state = {
        searchTerm: "",
        listOfDiffs: [],
        listOfStatus: [],
        filter: "Total",
        bookmarksOnly: false,
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
        obj.forEach(e => {
            fetchCountry(e.country)
            .then(countryE => {
                e.country = countryE.name
                e.id = countryE.id
            })
        })
        console.log(obj)
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
        let arrayToReturn = this.listOfStatus
        switch(this.state.filter){
            case "Total":
                arrayToReturn = this.state.listOfStatus
                break;
            case "Today":
                arrayToReturn = this.state.listOfDiffs
                break;
            default:
                arrayToReturn = this.listOfStatus
        }
        if (this.state.bookmarksOnly === false){
            return arrayToReturn
        } else {
            return this.showBookmarksOnly(arrayToReturn)
        }
    }

    showBookmarksOnly = (array) => {
        console.log(array)
        console.log(this.state.bookmarks)
        let filteredArray  = array.filter(e => {
            let foundCase = this.state.bookmarks.find(b => {
                return (e.id === b.country_id)
            })
            return foundCase
        })
        console.log(filteredArray)
        return filteredArray
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
        debugger
        this.state.bookmarks.forEach(e => {
            if (e["country_id"] === country_id){
                star = "⭑"
            }
        })
        return star
    }

    makeTableRow = (row) => {
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
        const token = localStorage.token
        if (evt.target.innerText === "☆") {
            evt.target.innerText = "⭑"
            console.log(id)
            this.setState(prevState => ({
                ...prevState,
                bookmarks: [...prevState.bookmarks, {country_id: id}]
            }))
            
            fetchCreateBookmark(id, token)
            .then(obj => {
                console.log(obj)
        })
        } else {
            evt.target.innerText = "☆"

            this.deleteBookmarkFrontend(id)
            fetchDeleteBookmark(id, token)
            .then(obj => console.log(obj))
        }
    }

    deleteBookmarkFrontend(id){
        this.setState(prevState => ({
            ...prevState,
            bookmarks: [...prevState.bookmarks.filter(e => e.country_id !== id)]
        }))
        console.log(this.state)
    }

    handleBookmarkFilterClick = (evt) => {
        if (evt.target.innerText === "Show all entries"){
            evt.target.innerText = "Show Bookmarks Only"
            this.setState({ bookmarksOnly: false})
        } else { 
            evt.target.innerText = "Show all entries"
            this.setState({ bookmarksOnly: true})
        }
    }


    render() {
        return(
            <>
                <label htmlFor="Search">Search:</label>
                <input type="text" autoComplete="off" name="search" value={this.state.searchTerm} onChange={this.handleChange}/>
                <button onClick={this.handleTotalClick}>Total</button>
                <button onClick={this.handleTodayClick}>Today</button>
                <br/>
                <button onClick={this.handleBookmarkFilterClick}>Show Bookmarks Only</button>
                <table>
                    <thead>
                        <tr>
                            <th><h1>   </h1></th>
                            <th><h1>Country</h1></th>
                            <th><h1>Cases</h1></th>
                            <th><h1>Deaths</h1></th>
                            <th><h1>Recovered</h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.filterBySearch().map(r => this.makeTableRow(r))}
                    </tbody>
                </table>
            </>
        )
    }
}


export default Search



