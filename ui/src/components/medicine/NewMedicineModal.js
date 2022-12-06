import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import MedicineForm from '../shared/MedicineForm'
import { createMedicine } from '../../api/medicines'


const NewMedicineModal = (props) => {
    const { 
        user, patient, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [medicine, setMedicine] = useState({})

    // console.log('medicine in edit modal', medicine)

    const handleChange = (e) => {
        setMedicine(prevMedicine => {
            let value = e.target.value
            const name = e.target.name

            // console.log('this is the input type', e.target.type)

            // this handles the checkbox, changing on to true etc
            // if (name === "isSqueaky" && e.target.checked) {
            //     value = true
            // } else if (name === "isSqueaky" && !e.target.checked) {
            //     value = false
            // }

            const updatedMedicine = {
                [name]: value
            }
            return {
                ...prevMedicine,
                ...updatedMedicine
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()
        createMedicine(user, patient._id, medicine)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'We Are On Road To Recovery',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again',
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <MedicineForm 
                    medicine={medicine}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Prescribe The Medicine To The Patient!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewMedicineModal