const Author = require('../models/Author')
const {comparePassword} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

class AuthorController {
   static async register(req, res, next) {
      const {username, email, password} = req.body
      const inputs = {}

      if(username) inputs.username = username
      if(email) inputs.email = email
      if(password) inputs.password = password

      const author = await Author.create(inputs)
      const token = jwt.sign({authorId: author._id}, process.env.JWT_SECRET)
      
      res.status(201).json({token})
   }

   static async login(req, res, next) {
      try {
         const {email, password} = req.body
         const author = await Author.findOne({email})
   
         if(!author || !comparePassword(password, author.password)) throw {
            errorCode: 400,
            message: 'Invalid email and password combination'
         }

         const token = jwt.sign({authorId: author._id}, process.env.JWT_SECRET)
         
         res.status(200).json({token})
      }
      catch (error) {
         next(error)
      }
   }

   static async read(req, res, next) {
      try {
         const authors = await Author.find()   
         res.status(200).json({authors})
      }
      catch (error) {
         next(error)
      }
   }
}

module.exports = AuthorController