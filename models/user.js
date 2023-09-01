const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email:{
        type: String,
        required:[true, 'Please provide email'],
        match: [
            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            'Please provide valid emaii',
        ],
        unique: true,
    },
    password:{
        type: String,
        required:[true, 'Please provide name'],
        minlength: 6,
    },
})

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

UserSchema.methods.getName = function() {
    return this.name
}

module.exports = mongoose.model('User', UserSchema)