# Pangea Healthcare Example Frontend

Forked from: https://github.com/nickesparza/ga-project-3-client

This is a MERN stack application; we leverage node.js and React with functional components for the frontend client application, along with React Bootstrap for styling. The client connects via Express with Mongoose to the MongoDB server on the backend.

Patient data is seeded in the mongoDB server according to the patient model. After that, the data can be manipulated by authenticated users inside the client.

## Installation Instructions
You need to install dependencies with `npm install`.
a seed script is available via `npm run seed` to provide some starter data to work with.
After that, `npm start` will launch both the mongoDB server and the react client.

## User Stories
- As an unauthenticated user, I want to be able to sign up..
- As an unauthenticated user, I want to be able to log in.
- As an authenticated user, I want to be able to change my password.
- As an authenticated user, I want to be able to log out.
- As an authenticated user, I want to be able to see all patients.
- As an authenticated user, I want to be able to see a single patient.
- As an authenticated user, I want to be able to create/enter a patient into the system.
- As an authenticated user, I want to be able to edit/update a patient's details.
- As an authenticated user, I want to be able to add a treatment plan to a patient.
- As an authenticated user, I want to be able to delete/discharge a patient.
- As an authenticated user, I want to be able to see all medications associated with a patient.
- As an authenticated user, I want to be able to add a medication to a patient.
- As an authenticated user, I want to be able to update the medication on a patient.
- As an authenticated user, I want to be able to delete a medication off a patient's chart.

## Models
- User
    - Username: String
    - Password: String (hashed)
    - Token: String
    - Patients: Array

- Patient
    - Name: String
    - Age: Number
    - Blood Type: String, enum
    - Emergency Contact Telephone #: String
    - Preexisting Conditions: String
    - Current Condition: String, enum
    - Treatment Plan: String
    - Comments: String
    - Doctors: Array
    - Medicines: Array

- Medicine (subdoc)
    - Name: String
    - Dosage: String
    - Duration: String

## Routes
### User Routes
#### React
| Endpoint                 | Component        | Description          | `AuthenticatedRoute?` |
|--------------------------|------------------|----------------------|-----------------------|
| `/users/sign-in`         | `SignIn`         | User sign-in page    | No                    |
| `/users/sign-up`         | `SignUp`         | User sign-up page    | No                    |
| `/users/change-password` | `ChangePassword` | Change password page | Yes                   |
| `users/sign-out`         | `SignOut`        | Signout confirmation | Yes                   |

### Patient Routes
#### React
| Endpoint             | Component       | Description                       | `authenticatedRoute?` |
|----------------------|-----------------|-----------------------------------|-----------------------|
| `/patients/`         | `PatientList`   | Display of all patients           | Yes                   |
| `/patients/:id`      | `ShowPatient`   | Display of one patient            | Yes                   |
| `/patients/new`      | `NewPatient`    | Container for new patient form    | Yes                   |
| `/patients/:id/edit` | `EditPatient`   | Container for edit patient form   | Yes                   |
| `/patients/delete`   | `DeletePatient` | Confirmation for deleting patient | Yes                   |

#### Express
| REST    | Description                   | HTTP Verb | Express Route          |
|---------|-------------------------------|-----------|------------------------|
| INDEX   | patient index                 | GET       | `/patients`            |
| SHOW    | patient show page             | GET       | `/patients/:id`        |
| NEW     | new patient form              | POST      | `/patients/new`        |
| CREATE  | create new patient            | POST      | `/patients`            |
| EDIT    | edit existing patient         | GET       | `/patients/:id/edit`   |
| UPDATE  | Set user to attend to patient | PATCH     | `/patients/:id/attend` |
| UPDATE  | update patient                | PATCH     | `/patients/:id`        |
| DESTROY | remove patient                | DELETE    | `/patients/:id`        |

### Medicine Routes
#### Express
| REST    | Description           | HTTP Verb | Express Route                         |
|---------|-----------------------|-----------|---------------------------------------|
| NEW     | create new medicine   | POST      | `/medications/:patientId`             |
| UPDATE  | update medicine       | PATCH     | `/medications/:medicineId/:patientId` |
| DESTROY | remove medicine       | DELETE    | `/medicines/medicineId/:patientId`    |

#### React Components
| Component Name        | Description                                                 |
|-----------------------|-------------------------------------------------------------|
| `ShowMedicine`        | Main container for medicine details and UI options          |
| `CreateMedicineModal` | Modal that appears on ShowPatient page to create a medicine |
| `EditMedicineModal`   | Modal that appears on ShowPatient page to edit a medicine   |
| `DeleteMedicineModal` | Modal that confirms the deletion of a medicine              |

### Component Hierarchy
- App
    - Header
    - Home
        - HomePage
        - Auth
            - SignIn
            - SignOut
            - SignUp
            - ChangePassword
        - PatientList
        - ShowPatient
            - PatientDetails
            - TreatmentPlan
                - ShowMedicine
                - CreateMedicineModal
                - EditMedicineModal
            - EditPatientModal
            - DeletePatientModal
        - NewPatient
