const router = require('express').Router()
const db = require('../models')
module.exports = router


router.get('/', async (req, res)=>{
    try {
        const events = await db.Event.find()
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

router.post('/new', async (req,res)=>{
    try {
        const createdEvent = await db.Event.create({
            title: req.body.title,
            date: req.body.date,
            time: req.body.time,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            cover: req.body.cover,
            genre: req.body.genre,
            details: req.body.details
        }) 
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
        await db.Event.findByIdAndDelete(req.params.id)
        res.status(204).json({message: 'event deleted from the database'})
    }catch (error) {
        console.log(error)
    }
})