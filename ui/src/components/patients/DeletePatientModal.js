import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Button } from "react-bootstrap"
import messages from '../shared/AutoDismissAlert/messages'
import { deletePatient } from '../../api/patients'

const DeletePatientModal = (props) => {
    const {patient, msgAlert, show, user, handleClose} = props
    const navigate = useNavigate()

    const dischargePatient = () => {
        deletePatient(user, patient._id)
            // on success, send a success message, then navigate to index
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.deletePatientSuccess,
                    variant: 'success'
                })
            })
            .then(() => navigate('/'))
            .catch(() => {
                msgAlert({
                    heading: 'Oops...',
                    message: messages.deletePatientFailure,
                    variant: 'danger'
                })
            })
    }

    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <h2>Discharge Patient</h2>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you wish to discharge this patient?</p>
                    <Button variant='primary' className='mx-2' onClick={() => {
                        dischargePatient()
                    }}>Yes</Button>
                    <Button variant='danger' className='mx-2' onClick={handleClose}>No</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DeletePatientModal