const {decodeToken} = require('../helpers/jwt')

module.exports = (req,res,next)=>{

    if(req.headers.hasOwnProperty('token')){
        try{
            const payload = decodeToken(req.headers.token)
            req.payload = payload
            next()
        }catch(err){
            console.log(err)
            next(err)
        }
    }else{
        throw new Error('please register/login first')
    }


}
