import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignIn = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 	}
	// }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

	// handleChange = (event) =>
	// 	this.setState({
	// 		[event.target.name]: event.target.value,
	// 	})

	const onSignIn = (event) => {
		event.preventDefault()
        // console.log('the props', props)
		const { msgAlert, setUser } = props

        const credentials = {email, password}

		signIn(credentials)
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3>Sign In</h3>
                <Form onSubmit={onSignIn}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button className='my-2' variant='primary' type='submit'>
                        Log In
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default SignIn
