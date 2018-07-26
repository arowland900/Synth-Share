import React from 'react';
import httpClient from '../httpClient';

class Settings extends React.Component {
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
		httpClient.editUser(this.state.fields).then((user) => {
			this.setState({ name: '', email: '', password: '' })
			if(user) {
				
				this.props.history.push('/')
			}
		})
	}
    render(){


        return (
            <div className="Settings">
			<div className="row">
				<div className="column column-33 column-offset-33">
					<h1>Edit Info</h1>
					<form
						onChange={this.onInputChange.bind(this)}
						onSubmit={this.onFormSubmit.bind(this)}
					>
						<input type="text" placeholder="Name" name="name" autoComplete="off" />
						<input type="text" placeholder="Email" name="email" autoComplete="off" />
						<input type="password" placeholder="Password" name="password" autoComplete="off" />
						<button>Edit Info</button>
					</form>
				</div>
			</div>
		</div>
        )
    }
}

export default Settings