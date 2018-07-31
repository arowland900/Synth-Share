import React from 'react'
import httpClient from '../httpClient'
import { Button, Form, Container } from 'semantic-ui-react'


class SignUp extends React.Component {

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
		httpClient.signUp(this.state.fields).then((user) => {
			this.setState({ name: '', email: '', password: '' })
			if(user) {
				this.props.onSignUpSuccess()
				this.props.history.push('/')
			}
		})
	}

	render() {
		return (
		// <div className="SignUp">
		// 	<div className="row">
		// 		<div className="column column-33 column-offset-33">
		// 			<h1>Sign Up</h1>
		// 			<form
		// 				onChange={this.onInputChange.bind(this)}
		// 				onSubmit={this.onFormSubmit.bind(this)}
		// 			>
		// 				<input type="text" placeholder="Name" name="name" autoComplete="off" />
		// 				<input type="text" placeholder="Email" name="email" autoComplete="off" />
		// 				<input type="password" placeholder="Password" name="password" autoComplete="off" />
		// 				<button>Sign Up</button>
		// 			</form>
		// 		</div>
		// 	</div>
		// </div>

		<Container  >
			<h1>Sign Up</h1>
			<Form
				onChange={this.onInputChange.bind(this)}
				onSubmit={this.onFormSubmit.bind(this)}
			>
				<Form.Field>
				{/* <label>First Name</label> */}
				<input type="text" placeholder="Name" name="name" autoComplete="off" />				
				</Form.Field>
				<Form.Field>
				{/* <label>First Name</label> */}
				<input type="text" placeholder="Email" name="email" autoComplete="off" />
				</Form.Field>
				<Form.Field>
				{/* <label>Last Name</label> */}
				<input type="password" placeholder="Password" name="password" autoComplete="off" />
				</Form.Field>
				<Button type='submit'>Sign Up</Button>
			</Form>
		</Container>
		)
	}
}

export default SignUp