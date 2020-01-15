const Article = require('../model/Article')

module.exports = function(mode){
    return (req,res,next)=>{
    
        console.log(mode);
        
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
        else if (mode === 'article')
          {
              Article.findOne({
                  _id: req.params.articleId
              })
              .then(result=>{
                    if(!result)
                      next({ 
                          name: 'INVALID RESOURCE ID',
                          status: 404, 
                          message:"resource not found"
                      })
                    else
                      {
                          if(String(result.Author._id) === String(req.decodedUser._id))
                            {   
                                console.log(`AUTHORIZATION ${mode} passed`);
                                next()
                            }
                          else
                            {
                                next({
                                    name: "AUTHORIZATION REJECTED",
                                    status:403,
                                    message: 'unAuthorized Access'
                                })
                            }
                      }
              })
              .catch(err=>{
                  next(err)
              })
          }
    }
} 