// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for patients
const Patient = require('../models/patient')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /patients
router.get('/patients', requireToken, (req, res, next) => {
	Patient.find()
        .populate('doctors')
		.then((patients) => {
			// `patients` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return patients.map((patient) => patient.toObject())
		})
		// respond with status 200 and JSON of the patients
		.then((patients) => {
			console.log("**** Patient Record Accessed ****")
			res.status(200).json({ patients: patients })
		})
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /patients/5a7db6c74d55bc51bdf39793
router.get('/patients/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Patient.findById(req.params.id)
        .populate('doctors')
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "patient" JSON
		.then((patient) => {
			console.log("**** Patient Record Accessed ****")
			res.status(200).json({ patient: patient.toObject() })
	})
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /patients
router.post('/patients', requireToken, (req, res, next) => {
	// set owner of new patient to be current user
	req.body.patient.owner = req.user.id

	Patient.create(req.body.patient)
        // also add owner to the list of attending doctors
        .then(patient => {
            patient.doctors.push(req.body.patient.owner)
            return patient.save()
        })
		// respond to succesful `create` with status 201 and JSON of new "patient"
		.then((patient) => {
			console.log("**** Patient Record Created ****")
			res.status(201).json({ patient: patient.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE - general update route for most patient fields
// PATCH /pets/5a7db6c74d55bc51bdf39793
router.patch('/patients/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.patient.owner

	Patient.findById(req.params.id)
		.then(handle404)
		.then((patient) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			// requireOwnership(req, patient)
			console.log("**** Patient Record Updated ****")
			// pass the result of Mongoose's `.update` to the next `.then`
			return patient.updateOne(req.body.patient)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// ATTEND to patient - append/remove user to the "doctors" array to enable a button for "attend" on the frontend
// PATCH /pets/5a7db6c74d55bc51bdf39793
router.patch('/patients/:id/attend', requireToken, removeBlanks, (req, res, next) => {
	Patient.findById(req.params.id)
		.then(handle404)
		.then((patient) => {
			// get current user id
            const newDoctor = req.user.id
            // if doctors array doesn't contain user id, push it in, if it does, pull it out
            if (patient.doctors.includes(newDoctor)) {
                patient.doctors.splice(patient.doctors.indexOf(newDoctor), 1)
            } else {
                patient.doctors.push(newDoctor)
            }
						console.log("**** Patient Record Updated ****")
            // return saved patient
            return patient.save()
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /patients/5a7db6c74d55bc51bdf39793
router.delete('/patients/:id', requireToken, (req, res, next) => {
	Patient.findById(req.params.id)
		.then(handle404)
		.then((patient) => {
			// throw an error if current user doesn't own `patient`
			// requireOwnership(req, patient)
			// delete the patient ONLY IF the above didn't throw
			console.log(patient);
			patient.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => {
			console.log("**** Patient Record Deleted ****")
			res.sendStatus(204)
		})
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
