const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    events: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]
})

module.exports = mongoose.model('User', userSchema)