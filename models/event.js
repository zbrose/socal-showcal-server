const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: String,
    date: String,
    time: String,
    address: String,
    city: String,
    state: String,
    zipcode: Number,
    cover: Number,
    genre: String,
    details: String,
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

module.exports = mongoose.model('Event', eventSchema)