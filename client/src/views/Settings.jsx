import React from 'react';
import httpClient from '../httpClient';
import { Button, Form, Container } from 'semantic-ui-react'

class Settings extends React.Component {
    state = {
        name: '', 
        email: '',
        password: ''
        // filter: ''

    }

    componentDidMount() {
        let currentUser = httpClient.getCurrentUser();
        let { name, email } = currentUser;
        this.setState({ name, email });
    }

	// onInputChange(evt) {
	// 	this.setState({
	// 		fields: {
	// 			...this.state.fields,
	// 			[evt.target.name]: evt.target.value
	// 		}
	// 	})
    // }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

	onFormSubmit(evt) {
		evt.preventDefault()
		httpClient.editUser(this.state).then((user) => {
            // debugger
            let { name, email } = user;
            this.setState({ name, email })
            this.props.history.push('/')
		})
    }

    
    
    onButtonClick(){
        httpClient.delete()
        this.props.onDeleteSuccess()
        this.props.history.push('/')
    }
    
    // 
    render(){
        let { name, email, password } = this.state;
        console.log(this.state)
        return (
            // <div className="Settings">
            //     <div className="row">
            //         <div className="column column-33 column-offset-33">
            //             {/* <h1>{this.state.fields.name}</h1> */}
            //             <h1>Edit Info</h1>
            //             <form
            //                 // onChange={this.onInputChange.bind(this)}
            //                 onSubmit={this.onFormSubmit.bind(this)}
            //             >
            //                 <input type="text" placeholder="Name" name="name" autoComplete="off" value={name} onChange={this.handleChange} />
            //                 <input type="text" placeholder="Email" name="email" autoComplete="off" value={email} onChange={this.handleChange} />
            //                 <input type="password" placeholder="Password" name="password" autoComplete="off" value={password} onChange={this.handleChange} />
            //                 <button>Edit Info</button>
            //                 <button onClick={this.onButtonClick.bind(this)}>Delete User</button>
            //             </form>
            //         </div>
            //     </div>
            // </div>

            <Container  >
                <h1>Edit Info</h1>
                <Form
                    onSubmit={this.onFormSubmit.bind(this)}
                >
                    <Form.Field>
                    {/* <label>First Name</label> */}
                    <input type="text" placeholder="Name" name="name" autoComplete="off" value={name} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                    {/* <label>First Name</label> */}
                    <input type="text" placeholder="Email" name="email" autoComplete="off" value={email} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                    {/* <label>Last Name</label> */}
                    <input type="password" placeholder="Password" name="password" autoComplete="off" value={password} onChange={this.handleChange} />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                    <Button onClick={this.onButtonClick.bind(this)}>Delete User</Button>
                </Form>
            </Container>
        )
    }
}

export default Settings