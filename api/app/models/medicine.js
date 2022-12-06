const mongoose = require('mongoose')

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dosage: String,
    duration: String
}, {
    timestamps: true
})

module.exports = medicineSchema