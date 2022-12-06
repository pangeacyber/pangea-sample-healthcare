// script: npm run seed
// node ./app/models/seed.js
const mongoose = require('mongoose')
const db = require('../../config/db')
const Patient = require('./patient')

const starterPatients = [
    {
        name: "Nick Esparza",
		age: "33",
        bloodType: "A-",
        emergencyContact: "555-123-4567",
        preCon: "too cool for school",
        currCon: "stable",
        treatment: "",
        comments: "none"
    },
    {
        name: "Agatha Christie",
		age: "92",
        bloodType: "O+",
        emergencyContact: "555-321-4567",
        preCon: "high blood pressure, gout",
        currCon: "serious",
        treatment: "blood thinners, wheelchair for one month",
        comments: "patient reports normal abilities up until recently"
    },
    {
        name: "Timm Schoenborn",
		age: "50",
        bloodType: "B+",
        emergencyContact: "444-123-4567",
        preCon: "donut dependency",
        currCon: "stable",
        treatment: "50cc of donuts hourly",
        comments: "man this guy really loves donuts"
    },
    {
        name: "Pablo Martinez",
		age: "77",
        bloodType: "AB-",
        emergencyContact: "555-123-7654",
        preCon: "none",
        currCon: "stable",
        treatment: "painkillers for 14 days",
        comments: "MRI scheduled, migraines possible"
    },
    {
        name: "Shirley Jackson",
		age: "40",
        bloodType: "O-",
        emergencyContact: "654-321-4567",
        preCon: "knee replacement",
        currCon: "stable",
        treatment: "knee X-ray",
        comments: "none"
    },
    {
        name: "Napoleon Dynamite",
		age: "24",
        bloodType: "B-",
        emergencyContact: "666-666-6667",
        preCon: "dance machine",
        currCon: "critical",
        treatment: "",
        comments: "none"
    },
    {
        name: "Ray Fujimoto",
		age: "37",
        bloodType: "O+",
        emergencyContact: "210-999-8877",
        preCon: "smoker",
        currCon: "critical",
        treatment: "chest X-ray",
        comments: "patient is receiving oxygen and awaiting results of X-ray"
    },
    {
        name: "Edward Rochester",
		age: "17",
        bloodType: "A-",
        emergencyContact: "01344-641-847",
        preCon: "none",
        currCon: "serious",
        treatment: "set bone, cast, physical therapy",
        comments: "none"
    },
    {
        name: "Naruto Uzumaki",
		age: "15",
        bloodType: "B-",
        emergencyContact: "404-112-9988",
        preCon: "demon fox blood",
        currCon: "stable",
        treatment: "2 Sharingan straight to the face",
        comments: "Believe it!"
    },
    {
        name: "Carol King",
		age: "56",
        bloodType: "AB+",
        emergencyContact: "412-636-7834",
        preCon: "high blood pressure, cancer history",
        currCon: "stable",
        treatment: "20cc fluids, bed rest, monitor overnight",
        comments: "Patient is currently alert and active"
    },
]

mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        Patient.deleteMany({})
            .then(deletedPatients => {
                console.log('Patients deleted', deletedPatients)
                Patient.create(starterPatients)
                    .then(newPatients => {
                        console.log('New patients were created', newPatients.length)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })