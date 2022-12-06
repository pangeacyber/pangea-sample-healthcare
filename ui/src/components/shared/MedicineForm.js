import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const MedicineForm = (props) => {
    const {medicine, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="What is the medicine's name?"
                    name="name"
                    id="name"
                    value={ medicine.name }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="dosage">Dosage</Form.Label>
                <Form.Control
                    placeholder="Current Dosage"
                    name="dosage"
                    id="dosage"
                    value={ medicine.dosage }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="duration">Duration</Form.Label>
                <Form.Control
                    placeholder="Duration"
                    name="duration"
                    id="duration"
                    value={ medicine.duration }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default MedicineForm