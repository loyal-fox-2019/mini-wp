const Author = require('../models/Author')
const {comparePassword} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

class AuthorController {
   static async register(req, res, next) {
      try {
         const {username, email, password} = req.body
         const inputs = {}
   
         if(username) inputs.username = username
         if(email) inputs.email = email
         if(password) inputs.password = password

         console.log(username, email, 'this is inputs\n-----------\n')
   
         const author = await Author.create(inputs)
         const token = jwt.sign({authorId: author._id}, process.env.JWT_SECRET)
         
         res.status(201).json({token, authorId: author._id})
      }
      catch (error) {
         next(error)
      }
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
         
         res.status(200).json({token, authorId: author._id})
      }
      catch (error) {
         next(error)
      }
   }

   static async updateWatchedTags(req, res, next) {
      try {
         const author = await Author.findOne({_id: req.authorId})

         if(author.tags.includes(req.body.tag)) res.status(200).json({message: 'This tag has already been registered to your watched tags'})
         else {
            const results = await Author.updateOne(
               {_id: req.params.id},
   
               {
                  $push: {
                     tags: req.body.tag
                  }
               }
            )
   
            res.status(200).json({results})
         }
      }
      catch (error) {
         next(error)
      }
   }

   static async getWatchedTags(req, res, next) {
      try {
         const author = await Author.findOne({_id: req.authorId})
         res.status(200).json({tags: author.tags})
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