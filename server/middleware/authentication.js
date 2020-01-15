const User = require('../model/User')
const { verifyToken } = require('../helper/jwt')

module.exports = (req,res,next)=>{
    
    console.log(`
        AUTHENTICATION IS RUNNING
        =========================
    `);

    const decodedUser = verifyToken( req.headers.token )
    User.findOne({
        _id: decodedUser._id
    })
    .then(result=>{
        if(!result)
            next({
                name: 'AUTHENTICATION REJECTED',
                status: 404, 
                message:'invalid token used'
            })
        else
          {
              req.decodedUser = result
              console.log('AUTHENTICATION PASSED');
              next()
          }
    })
    .catch(err=>{
        next(err)
    })



}
