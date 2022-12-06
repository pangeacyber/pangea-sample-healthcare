import { 
    useState, 
    useEffect 
} from 'react'
// import { propTypes } from 'react-bootstrap/esm/Image'
import {Container, Card, Row, Col, Image} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllPatients } from '../../api/patients'
import profilePicture from '../../imgs/profile.jpeg'

import messages from '../shared/AutoDismissAlert/messages'


// STYLE FOR CARDs
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
   
    
}

/// PATIENTS LIST 
const PatientIndex = (props) => {
    const [patients, setPatients] = useState(null)
    const { msgAlert } = props
    const { user } = props
    const navigate = useNavigate()
    // console.log('user in PatientIndex', user)
    useEffect(() => {
        // console.log('useEffect has run')
        if (user) {
            getAllPatients(user)
            // .then(res => console.log(res))
            .then(res => setPatients(res.data.patients))
            //console.log('use effects work')
            .catch(err => {
                msgAlert ({
                heading: 'Error Getting Patients',
                message: messages.getPatientsFailure,
                variant: 'danger',
            })
        })
        // if there is no user, console log this message.. no showing the patients....
        } else {
            navigate('/')
        }
    // eslint-disable-next-line
    }, [user])

    // if (error) {
    //     return <p>Error!</p>
    // }

    // this is fine as the loading screen condition
    if(!patients) {
        // return <p>Loading...</p>
        return <LoadingScreen />
    // if the patient list is 0, but a user exists, show them that they have the ability to add patients
    } else if (patients.length === 0 && user ) {
        return <p>No patients yet...Lets Add some.</p>
    }
    // if there is no user, tell them to log in

    const patientCards = patients.map(patient => (
        <Col md='4'>
            <Card style={{width: '100%', margin: 5, borderRadius:'20px', backgroundColor:'rgb(58 ,95, 95)', color:'white'}} key={patient._id}>
                <Card.Header>{ patient.name }</Card.Header>
                <Link to={`/patients/${patient._id}`}>
                    <Image fluid={true} src={profilePicture} alt='placeholder image for patient photo'/>
                </Link>
                <Card.Body>
                    <Card.Text>
                        <Link style={{color: 'white'}} to={`/patients/${patient._id}`}>View</Link> 
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
        ))


        //SHOWING PATIENT CARDS ON BODY
        return(
            <Container>
                <Row style={cardContainerStyle} className='justify-content-center'>
                    { patientCards }
                </Row>
            </Container>
        )



    

    // return <h1>This is Patients Index</h1>
}


export default PatientIndex