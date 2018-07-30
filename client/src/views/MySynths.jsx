import React from 'react';
import httpClient from '../httpClient';
import { Link } from 'react-router-dom';


class MySynths extends React.Component {
    
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

        let { currentUser } = this.props
        console.log(currentUser, this.state)

        const result = this.state.synths.filter((s) => {
            // console.log(s._by)
            // console.log(currentUser._id)
            return s._by === currentUser._id
        })


        return (
            <div className="Home">
                <h1>Welcome to Synth Maker!</h1>
                <div>
                    <div className="Synths center">
                    
                        <ul className="list">
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

export default MySynths