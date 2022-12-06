import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createMedicine = (user, patientId, newMedicine) => {
    console.log('the user in createMedicine', user)
    console.log('the newMedicine in createMedicine', newMedicine)
	return axios({
		url: `${apiUrl}/medication/${patientId}`,
		method: 'POST',
        headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { medicine: newMedicine }
	})
}

// UPDATE Medicine
export const updateMedicine = (user, patientId, updatedMedicine) => {
    console.log('this is updatedMedicine', updatedMedicine)
	return axios({
		url: `${apiUrl}/medication/${patientId}/${updatedMedicine._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { medicine: updatedMedicine }
	})
}

// DELETE Medicine
export const deleteMedicine = (user, patientId, medicineId) => {
	return axios({
		url: `${apiUrl}/medication/${patientId}/${medicineId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}