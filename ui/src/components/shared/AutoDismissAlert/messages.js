const messages = {
	signUpSuccess: "Successfully registered! You've been signed in as well.",
	signUpFailure:"Registration failed. Email may be taken, or passwords don't match.",
	signInSuccess: 'Welcome!',
	signInFailure:'Failed to sign in. Check your email and password and try again.',
	signOutSuccess: 'Come back soon!',
	changePasswordSuccess: 'Password changed successfully!',
	changePasswordFailure:'Failed to change passwords. Check your old password and try again.',
	getPatientsFailure: 'Error fetching patients.',
    showPatientFailure: 'Error getting patient details.',
    createPatientSuccess: 'Patient intake successful.',
    createPatientFailure: 'Something went wrong during intake. Please try again.',
    editPatientSuccess: 'Patient was successfully updated.',
    editPatientFailure: 'There was a problem updating this patient. Please try again.',
    deletePatientSuccess: 'Patient was successfully discharged.',
    deletePatientFailure: 'Something went wrong while deleting patient details. Please try again.',
}

module.exports = messages