const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.sendStatus(403);//unauthenticated()
    }
    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId:payload.userId, name:payload.name}
        next()
    } catch (error) {
        return res.sendStatus(403);//unauthenticated()
    }
}

module.exports = auth