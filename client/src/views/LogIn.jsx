import React from 'react'
import httpClient from '../httpClient'
import { Button, Form, Container } from 'semantic-ui-react'

class LogIn extends React.Component {

    state = {
        fields: { name: '', email: '', password: '' }
    }

    onInputChange(evt) {
        this.setState({
            fields: {
                ...this.state.fields,
                [evt.target.name]: evt.target.value
            }
        })
    }

    onFormSubmit(evt) {
        evt.preventDefault()
        console.log(this.state.fields)
        httpClient.logIn(this.state.fields).then((user) => {
            this.setState({ fields: { email: '', password: '' }})
            if(user) {
                this.props.onLogInSuccess()
                this.props.history.push('/')
            }
        })
    }

    render() {
        const { email, password } = this.state.fields
        return (
            <Container  >
                <Form
                    onChange={this.onInputChange.bind(this)}
                    onSubmit={this.onFormSubmit.bind(this)}
                >
                    <Form.Field>
                    {/* <label>First Name</label> */}
                    <input type="text" placeholder="Email" name="email" autoComplete="off" value={email} />
                    </Form.Field>
                    <Form.Field>
                    {/* <label>Last Name</label> */}
                    <input type="password" placeholder="Password" name="password" autoComplete="off" value={password} />
                    </Form.Field>
                    <Form.Field>
                    
                    </Form.Field>
                    <Button type='submit'>Log In</Button>
                </Form>
            </Container>

        )
    }
}

export default LogIn