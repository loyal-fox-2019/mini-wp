const User = require('../model/User')
const { verifyHash } = require('../helper/bcryptjs')
const { generateToken } = require('../helper/jwt')
class UserController{
    static test(req,res)
      {
            res.send('user connected')
      }



    static findAll(req,res,next)
      {
            User.find()
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(err=>{
                next(err)
            })
      }

    
    static masterDelete(req,res,next)
      {
            User.remove()
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(err=>{
                next(err)
            })
      }

    
    static registration(req,res,next)
      {
            const { username, firstName, lastName, email, password } = req.body
            const role = req.body.role || "user"
            
            User.create({
                username, firstName, lastName, email, password, role, 
                description: '',
                profilePicture : ''
            })
            .then(result=>{
                res.status(201).json({ 
                  token: generateToken({ _id:result._id }),
                  username: result.username
                })
            })
            .catch(err=>{
                next(err)
            })
      }

    
    static login(req,res,next)
      {
            //validation in case of user not providing complete requirement
            let objLogin = {
                email: '',
                password: ''
            }
            const keys = Object.keys(objLogin)

            let message = []
            keys.forEach(element => {
                if(!req.body[element])
                  message.push( element + ' must be provided' )
                else
                  objLogin[element] = req.body[element]
            });
            console.log("TCL: UserController -> objLogin", objLogin)

            if(message.length > 0)
              next({ status: 400, message})


            User.findOne({
                email : objLogin.email
            })
            .then(result=>{
                if(!result)
                  next({ status:404, message:'User not Found' })
                else
                  {
                    if(verifyHash( objLogin.password, result.password ))
                      {
                        res.status(202).json({ 
                          token : generateToken({ _id:result }),
                          username : result.username
                        })
                      }
                    else
                      throw({ status: 403, message:'email & password combination wrong'})
                  }
            })
            .catch(err=>{
                next(err)
            })
      }


    static googleLogIn(req,res,next)
      {
        
      }

    
    static findLoggedInUserDetail(req,res,next)
      {
          res.status(200).json(req.decodedUser)
      }

      
    static patchUpdate(req,res,next)
      {
            const validKey = ['firstName', 'lastName', 'email', 'description']
            const keys = Object.keys(req.body)
            
            let updateQuery = {}
            keys.forEach(element => {
                if( validKey.indexOf(element) >= 0 )
                  updateQuery[element] = req.body[element]
            });
            if(req.body.file)
              updateQuery.profilePicture = req.body.file
            console.log(`TCL: UserController -> updateQuery`, updateQuery)

            User.updateOne(
              { _id: req.params.userId},
              updateQuery,
              { runValidators: true }
            )
            .then(result=>{
                res.status(200).json({result})
            })
            .catch(err=>{
                next(err)
            })

      }


    static findOneUserDelete(req,res,next)
      {
          User.findOneAndDelete({
              _id: req.params.userId
          })
          .then(result=>{
              if(!result)
                next({ status: 404, message:'user not found' })

              res.status(200).json({ deletedUser : result})
          })
          .catch(err=>{
              next(err)
          })
      }

    // tester bulkFind
    static bulkFind(req,res,next)
      {
        console.log("TCL: UserController -> req.body.bulk", req.body.bulk)
        
        User.find({
          username : req.body.bulk
        })
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
      }
}

module.exports = UserController