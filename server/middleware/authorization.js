module.exports = function(mode){
    return (req,res,next)=>{
        console.log(`
            AUTHORIZATION IS RUNNING
            =========================
        `);

        if(mode === 'admin')
          {
              if(req.decodedUser.role === 'admin')
                {
                    console.log(`AUTHORIZATION ${mode} PASSED`);
                    next()
                }
              else
                next({ 
                    name: 'AUTHORIZATION REJECTED',
                    status: 403, 
                    message:"unAuthorized Access"
                })
          }
        else
          {
              let QueryModel = require(`../model/${mode}`)
              const key = Object.keys(req.params)

              QueryModel.findOne({
                  _id: req.params[key]
              })
              .then(result=>{
                    if(!result)
                      throw ({ 
                          name: 'INVALID RESOURCE ID',
                          status: 404, 
                          message:"resource not found"
                      })
                    else
                      {
                          if( mode === 'Article' && String(result.Author._id) === String(req.decodedUser._id) ||
                              mode === 'User' && String(result._id) === String(req.decodedUser._id) )
                            {
                                console.log(`AUTHORIZATION ${mode} passed`);
                                next()
                            }
                          else
                            throw ({
                                name: "AUTHORIZATION REJECTED",
                                status:403,
                                message: 'unAuthorized Access'
                            }) 

                      }
              })
              .catch(err=>{
                  next(err)
              })
          }
    }
} 