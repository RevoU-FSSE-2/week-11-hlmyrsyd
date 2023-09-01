const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader){
        return res.sendStatus(401);//unauthorized()
    } 
    
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {id,username} = decoded
        req.user = {id,username}
        next()
    } catch (error) {
        return res.sendStatus(401);//Not authorized to access this route()
    }

    // console.log(req.headers.authorization)
}

module.exports = authenticationMiddleware