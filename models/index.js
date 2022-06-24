const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/events'

//connect to the db uri
mongoose.connect(MONGODB_URI)
//grab the db connection
const db = mongoose.connection
//have some callback messages on connection
db.once('open',()=>{
    console.log(`mongoose connected @ ${db.host}:${db.host}`)
})
db.on('error',(err)=>{
    console.log(err,'yo something so seriously WRONG')
})

module.exports.Event = require('./event')
module.exports.User = require('./user')