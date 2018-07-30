import React from 'react';
import httpClient from '../httpClient'
import { Link } from 'react-router-dom';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Form,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
  } from 'semantic-ui-react'

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
            <Container>
                <h1>Browse Synths Here</h1>

                <Container>
                <Segment vertical>
                    {/* <Grid container stackable verticalAlign='middle'> */}
                    <Grid columns={3}>
                        <Grid.Row>
                        <Grid.Column>
                        </Grid.Column>
                        <Grid.Column width={5}>
                        <Form>
                            <Form.Field>
                            {/* <label>First Name</label> */}
                            <input onChange={this.handleChange.bind(this)} className="search" type="text" focus placeholder="Search for Synths Here" />
                            {/* <input placeholder='First Name' /> */}
                            </Form.Field>
                        </Form>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
                    <div className="Synths">
                    
                        <ul className="list">
                        {result.map((synth, i) => {
                            let id = synth._id
                            return <li key={i}><Link to={`/synths/${id}`}>{synth.title}</Link></li>
                        })}
                        </ul>
                    
                    </div>
                
            </Container>
        )
    }
}

export default Home