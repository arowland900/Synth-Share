import React from 'react';
import httpClient from '../httpClient'
import { Link } from 'react-router-dom';

class Home extends React.Component {

    state = {
        filter: '',
        synths: []
    }

    componentDidMount() {
        httpClient({ method: 'get', url: '/api/synths' }).then((apiResponse) => {
            this.setState({
                synths: apiResponse.data.payload
            })
        })
    }

    handleChange = (evt) => {
        evt.preventDefault();
        console.log(evt.target.value)
        this.setState({ filter: evt.target.value })
    }

    render(){

        const result = this.state.synths.filter((s) => {
            return s.title.toLowerCase().includes(this.state.filter.toLowerCase())
        })


        return (
            <div className="Home">
                <h1>Welcome to Synth Maker!</h1>
                <div>
                    <div className="Synths">
                    <input onChange={this.handleChange.bind(this)} className="input is-large" type="text" placeholder="Search for Synths Here" />
                    
                        <ul className="menu-list">
                        {result.map((synth, i) => {
                            let id = synth._id
                            return <li key={i}><Link to={`/synths/${id}`}>{synth.title}</Link></li>
                        })}
                        </ul>
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default Home