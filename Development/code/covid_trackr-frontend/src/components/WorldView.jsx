import React, { Component } from "react";
import {fetchTimeline} from '../services/utils';
class WorldView extends Component {
    
    state = {
        today: {},
        yesterday: {},
        diff: {}
    }

    componentDidMount = () => {
        fetchTimeline()
        .then(obj => {
            this.setState({
                today: obj[0],
                yesterday: obj[1]
            })
        })
        console.log(this.state)
    }

    makeTableRows = (row) => {
        return (
                        <tr>
                            <td>{"World"}</td>
                            <td>{row.total_cases}</td>
                            <td>{row.total_deaths}</td>
                            <td>{row.total_recovered}</td>
                        </tr>
            )
    }

    render() {
        const diff = {
            total_cases: this.state.today.total_cases - this.state.yesterday.total_cases,
            total_deaths: this.state.today.total_deaths - this.state.yesterday.total_deaths,
            total_recovered: this.state.today.total_recovered - this.state.yesterday.total_recovered
        }
        // debugger

        return(
            <div>

            <table>
                    <htead>
                        <tr>
                            <th>Country</th>
                            <th>Cases</th>
                            <th>Deaths</th>
                            <th>Recovered</th>
                        </tr>
                    </htead>
                    <tbody>
                            {this.makeTableRows(this.state.today)}
                    </tbody>

                </table>

            </div>
        )
    }
}

export default WorldView