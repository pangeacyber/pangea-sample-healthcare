import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import EditMedicineModal from './EditMedicineModal'
import { deleteMedicine } from '../../api/medicines'

const ShowMedicine = (props) => {
    // destructure some props
    const { medicine, patient, user, msgAlert, triggerRefresh } = props

    // here's where we'll put a hook to open the edit medicine modal when we get there
    const [editModalShow, setEditModalShow] = useState(false)

    // calls this to destroy a medicine
    const destroyMedicine = () => {
        deleteMedicine(user, patient._id, medicine._id)
            .then(() => 
                msgAlert({
                    heading: 'Medication Deleted',
                    message: 'Bye bye med!',
                    variant: 'success'
                }))
            .then(() => triggerRefresh())
            .catch(() => 
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                }))
    }

    return (
        <>
            <Card className='my-1'>
                <Card.Header>{medicine.name}</Card.Header>
                <Card.Body>
                    <h6>Dosage</h6>
                    <p>{medicine.dosage}</p>
                    <h6>Duration</h6>
                    <div>{medicine.duration}</div>
                </Card.Body>
                <Card.Footer>
                    {
                        <>
                            <Button
                                size='sm'
                                className='mx-2'
                                variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Edit Medicine
                            </Button>
                            <Button
                                size='sm'
                                className='mx-2'
                                onClick={() => destroyMedicine()} 
                                variant="danger"
                            >
                                Delete Medicine
                            </Button>
                        </>
                    }
                </Card.Footer>
            </Card>
            <EditMedicineModal
                user={user}
                patient={patient}
                medicine={medicine}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowMedicine