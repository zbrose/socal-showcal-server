const jwt = require('jsonwebtoken')
const db = require('../models')
require('dotenv').config()

async function requiresToken(req, res, next) {
  try {
    // get token from the client
    const token = req.headers.authorization
    // console.log('token: ', token)
    // verify the token -- if not verified will wind up in catch
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log('token decoded: ', decoded)
    // find the user from the data in the token
    const foundUser = await db.User.findById(decoded.id) //.populate('refs')
    // mount the user on the response for the next middle/route
    res.locals.user = foundUser
    // console.log('FOUND USER', foundUser)
    // invoke next to go the the next middleware function
    next()
  } catch (err) {
    // if we are down here -- authentication has fail
    console.log(err)
    res.status(403).json({ msg: 'unauthorized' })
  }
}

// function requiresToken(req,res,next) {
//   let authHeader = req.headers['authorization']
//   let token = authHeader && authHeader.split(' ')[1]
//   if(token = null) return res.status(401)
//   jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
//     if(err) return res.status(403)
//     req.user=user 
//     next()
//   })
// } 

module.exports = requiresToken

