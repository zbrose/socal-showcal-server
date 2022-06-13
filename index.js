const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/events', require('./controllers/events'))

app.get('/', (req,res)=>{
    res.send('Hello world')
})

const PORT = process.env.PORT || 8000 

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})