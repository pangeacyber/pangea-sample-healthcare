import PatientForm from "../shared/PatientForm"
import { createPatient } from "../../api/patients"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import messages from "../shared/AutoDismissAlert/messages"

const NewPatient = (props) => {
    // console.log('these are the props in NewPatient', props)
    const { msgAlert, user } = props
    const navigate = useNavigate()
    const [patient, setPatient] = useState({
        name: '',
        age: '',
        bloodType: '',
        emergencyContact: '',
        preCon: '',
        currCon: '',
        treatment: '',
        comments: ''
    })

    // console.log('this is patient in CreatePatient', patient)

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
        // console.log('info was submitted', patient)
        createPatient(user, patient)
            .then(res => navigate(`/patients/${res.data.patient._id}`))
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.createPatientSuccess,
                    variant: 'success'
                })
            })
            .catch((err) => {
                console.log(err)
                msgAlert({
                    heading: 'Warning',
                    message: messages.createPatientFailure,
                    variant: 'danger'
                })
            })
        }

        return (
                <PatientForm 
                    patient={patient}
                    heading="Intake New Patient"
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
        )

}

export default NewPatient