import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
	const { msgAlert, clearUser, user } = props
    // console.log('props in SignOut', props)

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.then(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.then(() => clearUser())
			.finally(() => navigate('/'))
            // .finally(() => {
            //     clearUser()
            //     navigate('/')
            // })
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
            <div className='row'>
                <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                    <h2>Are you sure you want to sign out?</h2>
                    <small>We hate to see you go...</small><br/>
                    <ButtonGroup>
                        <Button className='mx-2' variant='danger' onClick={onSignOut}>
                            Sign Out
                        </Button>
                        <Button className='mx-2' variant='warning' onClick={onCancel}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
		</>
	)
}

export default SignOut
