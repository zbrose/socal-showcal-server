require('dotenv').config()
const router = require('express').Router()
const db = require('../../models')
const requiresToken = require('../requiresToken')

router.get('/', async (req, res)=>{
    try {
        const events = await db.Event.find().populate('user')
        res.json(events)
    }catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req,res)=>{
    try {
        const foundEvent = await db.Event.findById(req.params.id)
        res.send(foundEvent)
    } catch (error) {
        console.log(error)
    }
})

router.post('/new', requiresToken, async (req,res) => {
    try {
        const foundUser = await db.User.findOne({
            _id: res.locals.user._id
        })
        const createdEvent = await db.Event.create({
            title: req.body.title,
            date: req.body.date,
            time: req.body.time,
            venue: req.body.venue,
            address: req.body.address,
            otherAddress: req.body.otherAddress,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            cover: req.body.cover,
            // genre: req.body.genre,
            link: req.body.link,
            details: req.body.details
        }) 
        
        foundUser.events.push(createdEvent)
        createdEvent.user.push(foundUser)
        createdEvent.save()
        foundUser.save()
        res.send(createdEvent)
    } catch (error){
        console.log(error)
    }
})

router.put('/:id/edit', async (req,res)=>{
    try {
        const foundEvent = await db.Event.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {new:true})
        res.send(foundEvent)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id', async (req,res)=>{
    try {
        await db.User.updateMany({ $pull: { events: req.params.id } })
        await db.Event.findByIdAndDelete(req.params.id)
        res.status(204).json({message: 'event deleted from the database'})
    }catch (error) {
        console.log(error)
    }
})

module.exports = router

