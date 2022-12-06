import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// // useParams will allow us to see our parameters
// // useNavigate will allow us to navigate to a specific page
import { Container, Card, Button } from 'react-bootstrap'

//EXTRA THINGS TO THE SHOW PATIENT
import LoadingScreen from '../shared/LoadingScreen'
import EditPatientModal from './EditPatientModal'
import DeletePatientModal from './DeletePatientModal'
import ShowMedicine from '../medicine/ShowMedicine'
import NewMedicineModal from '../medicine/NewMedicineModal'
import { getOnePatient, attendPatient } from '../../api/patients'
import { updatePatient } from '../../api/patients'


//IMPORTING STYLES 
import imgProfile from '../../imgs/profile.jpeg'

//FLEX GRID
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';



const ShowPatient = (props) => {
    //just on  Patient
    const [patient, setPatient] = useState(null) //null because dont wanna show nothing now
    const [editModalShow, setEditModalShow] = useState(false)
    const [deleteModalShow, setDeleteModalShow] = useState(false)
    const [treatmentModalShow, setTreatmentModalShow] = useState(false)
    const [newMedicinesModalShow, setNewMedicinesModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const {user, msgAlert} = props
    // console.log('this is the patient in ShowPatient', patient)
    const { id } = useParams()
    const navigate = useNavigate()
    //get the i value from our route paramaters

    useEffect(() => {
        if (user) {
            getOnePatient(user, id)
            .then(res => setPatient(res.data.patient))
            // .catch(err)
        } else {
            navigate('/sign-in')
        }
    // eslint-disable-next-line
    }, [updated])

    if(!patient) {
        return <LoadingScreen  />
    }

    let medCards
    if (patient) {
        // console.log('these are the medicines in patient', patient.medicines)
        if (patient.medicines.length > 0) {
            medCards = patient.medicines.map(medicine => (
                <ShowMedicine
                    key={medicine._id}
                    medicine={medicine}
                    user={user}
                    patient={patient}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    const doctorList = patient.doctors.map(doctor => {
        return doctor.email
    })

    const toggleDoctor = () => {
        attendPatient(user, patient)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Attending status updated.',
                    variant: 'success'
                })
            })
            .then(setUpdated(prev => !prev))
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: 'Patient was not edited.',
                    variant: 'danger'
                })
            })
    }
    // console.log('params in show Patient', params)
    return (
        <>
            {/*Patient CARD  */}
            <Container>
                <div className='row'>
                    <div className='col-md-5' style={{textAlign: 'center', marginTop:10}}>
                        <Card style={{margin: 5}}>
                            <div className='div-profile-IMG'>
                                <img className='image' style={{maxWidth: '45%',margin: "5"}} src={imgProfile} alt="the patient's face"/>
                            </div>
                                
                            <Card.Header><h2 >{ patient.name }</h2></Card.Header>
                            <Card.Body>
                                <p className='p-info'>Age:</p><p>{patient.age}</p>
                                <p className='p-info'>Blood Type:</p><p>{patient.bloodType}</p>
                                <p className='p-info'>Emergency Contact:</p><p>{patient.emergencyContact}</p>
                                <p className='p-info'>Pre-existing Conditions:</p><p>{patient.preCon}</p>
                                <p className='p-info'>Current Condition:</p><p>{patient.currCon}</p>
                                <p className='p-info'>Doctors:</p><p>{doctorList}</p>
                                
                            </Card.Body>
                            <Card.Footer>
                                    <Button size='sm' className='mx-2' variant='info' onClick={() => setEditModalShow(true)}>
                                        Edit Patient
                                    </Button>
                                    <Button size='sm' className='mx-2' variant='outline-danger' onClick={() => setDeleteModalShow(true)}>
                                        Discharge Patient
                                    </Button>
                            </Card.Footer>
                        </Card> 
                    </div>
                    <div className='col-md-7' style={{textAlign: 'center', marginTop:10}}>
                        <Card className='cards-patient-treat treatment-card' style={{margin: 5}}>
                            {/* <div  class="col" > */}
                            <Card.Header><h4>Treatment</h4></Card.Header>
                            <Card.Body>
                                <p className='p-info'>Treatment:</p><p>{patient.treatment}</p>
                                <p className='p-info'>Comments:</p><p>{patient.comments}</p>
                                {medCards}
                            </Card.Body>
                            <Card.Footer>
                                <Button size='sm' className='mx-2' variant='primary' onClick={() => setNewMedicinesModalShow(true)}>
                                    Prescribe
                                </Button>
                                <Button size='sm' className='mx-2' variant='info' onClick={() => {
                                    setEditModalShow(true)
                                    setTreatmentModalShow(true)
                                    }}>
                                    Set Treatment
                                </Button>
                                <Button size='sm' className='mx-2' variant='success' onClick={toggleDoctor}>
                                    Set attending status
                                </Button>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </Container>

        {/* </div> */}
            <EditPatientModal
                // modal needs patient info to populate fields
                patient={patient}
                // send state of treatmentModalShow so the modal knows which form to render
                treatmentModalShow={treatmentModalShow}
                // needs user in order to validate in the backend update function
                user={user}
                // msgAlert shows the success/fail messages
                msgAlert={msgAlert}
                // this sets the visibility of the modal when the relevant button is clicked
                show={editModalShow}
                // this is a function passed in from props that will run the patch route
                updatePatient={updatePatient}
                // this updates the state to trigger another useEvent pull of data
                triggerRefresh={() => setUpdated(prev => !prev)}
                // this closes the modal when the submit button is pressed
                handleClose={() => {
                    setEditModalShow(false)
                    setTreatmentModalShow(false)
                }} 
            />
            {/* Modal that appears to confirm deletion of a patient */}
            <DeletePatientModal
                // pass patient to delete modal to run the route
                patient={patient}
                // pass user for the same reason since deletePatient requires both
                user={user}
                msgAlert={msgAlert}
                // send state for visibility
                show={deleteModalShow}
                // send function to close manually
                handleClose={() => setDeleteModalShow(false)}
            />
            <NewMedicineModal
                patient={patient}
                user={user}
                msgAlert={msgAlert}
                show={newMedicinesModalShow}
                handleClose={() => setNewMedicinesModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowPatient