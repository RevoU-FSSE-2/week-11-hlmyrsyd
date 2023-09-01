const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const {name,email,password} = req.body

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const tempUser = {name, email, password:hashedPassword}

    if(!name || !email || !password){
        return res.status(400).send("Something is missing 😕"); 
        // return res.sendStatus(400);//badrequest()
    }
    const user = await User.create({ ...req.body })
    const token = jwt.sign({userId:user._id,name:user.name},'jwtSecret',{
        expiresIn:'30d',
    })
    res.status(StatusCodes.CREATED).json({ user:{name:user.getName()}, token })
}

const login = async (req, res) => {
    const {email, password} = req.body
    
    if(!email || !password){
        return res.status(400).send("Something is missing 😕"); 
    }
    const user = await User.findOne({email})
    // compare password
    if(!user){
        return  res.status(StatusCodes.UNAUTHORIZED).send("Invalid credentials")
    }
    
    const token = jwt.sign({userId:user._id,name:user.name},'jwtSecret',{
        expiresIn:'30d',
    })
    res.status(StatusCodes.OK).json({ user:{name:user.getName()}, token })
}

module.exports = {
    register,
    login
}