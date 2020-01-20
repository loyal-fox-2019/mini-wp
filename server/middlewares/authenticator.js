const {tokenVerifier} = require('../helpers/jwt');

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.token
        let userLoggedIn = tokenVerifier(token)
        req.userLoggedIn = userLoggedIn
        next()
    }
    catch{
        res.status(401).json({message:"invalid token"})
    }
}