const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'] ? req.headers['authorization'].split(" ")[1] : null
 
        if(!token) {
            return res.status(403).send({ status: false, message: "No token provided"}) 
        }

        const user = jwt.decode(token, "SHOP-FROM-BHARAT")
        if(!( user && user.token)) {
            return res.status(401).send({ status: false, message: "unauthorized access!"}) 
        }
        req.user = user
        next()
    }
    catch ( error ) {
        return res.status(401).send({ status: false, message: "something went wrong!"})
    }
}


module.exports = verifyToken