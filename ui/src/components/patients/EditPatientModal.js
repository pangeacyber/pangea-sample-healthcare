import React, {useState} from 'react'
import { Modal } from "react-bootstrap"
import messages from '../shared/AutoDismissAlert/messages'
import PatientForm from "../shared/PatientForm"
import TreatmentForm from "./TreatmentForm"

const EditPatientModal = (props) => {
    const {treatmentModalShow, msgAlert, user, show, handleClose, updatePatient, triggerRefresh} = props

    const [patient, setPatient] = useState(props.patient)

    const handleChange = (e) => {
        setPatient(prevPatient => {
            let value = e.target.value
            const name = e.target.name

            const updatedPatient = {
                [name]: value
            }

            return {
                ...prevPatient,
                ...updatedPatient
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        patient.doctors = props.patient.doctors
        patient.medicines = props.patient.medicines
        if (!patient.treatment) {
            patient.treatment = 'No treatment assigned.'
        }
        updatePatient(user, patient)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.editPatientSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: messages.editPatientFailure,
                    variant: 'danger'
                })
            })
    }

    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton/>
                <Modal.Body>
                    {
                        treatmentModalShow
                        ?
                        <TreatmentForm patient={patient} heading="Set Treatment Plan" handleChange={handleChange} handleSubmit={handleSubmit}/>
                        :
                        <PatientForm patient={patient} heading="Update Patient" handleChange={handleChange} handleSubmit={handleSubmit}/>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditPatientModal