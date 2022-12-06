import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container } from 'react-bootstrap'

const PatientForm = (props) => {
    const { patient, heading, handleChange, handleSubmit } = props

    return (
        <Container className='justify-content-center'>
            <h2>{heading}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor='treatment'>Treatment Plan</Form.Label>
                    <Form.Control
                        name='treatment'
                        value={patient.treatment}
                        type='textarea'
                        placeholder='Describe treatment plan'
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor='comments'>Comments</Form.Label>
                    <Form.Control
                        name='comments'
                        value={patient.comments}
                        type='text'
                        placeholder='Describe comments'
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className='my-3' variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default PatientForm