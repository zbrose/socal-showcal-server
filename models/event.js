const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: String,
    date: String,
    time: String,
    venue: String,
    address: String,
    customVenueName: String,
    otherAddress: String,
    city: String,
    state: String,
    zipcode: Number,
    cover: Number,
    genre: String,
    link: String,
    details: String,
    color: String,
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

module.exports = mongoose.model('Event', eventSchema)