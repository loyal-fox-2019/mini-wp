const User = require('../models/user')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
let payload

class userController {

    static addTag ( req,res,next ) {
        User.updateOne({_id:req.decoded.id},{
            $push: {tags:req.body.tag}
        })
            .then( result => {
                res.status(201).json(result)
            })
            .catch( next )
    }

    static getUser ( req,res,next ) {
        User.findById(req.decoded.id)
            .then( user => res.status(200).json(user))
            .catch( next )
    }

    static login ( req,res,next ) {
        User.findOne( {email: req.body.email} )
            .then( user => {
                if ( user ) {
                    if( checkPassword( req.body.password,user.password ) ) {
                        let token = generateToken( { id: user._id } )
                        res.status(200).json( { token } )
                    } else {
                        throw ( { code:400, message: 'Wrong Password' } )
                    }
                } else throw ( { code:404, message: 'User not found.' } )
            })
            .catch( next )
    }

    static register ( req,res,next ) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
            .then( user => {
                let token = generateToken( { id: user._id } )
                res.status(201).json( { token } )
            })
            .catch( next )
    }

    static googleSignIn ( req,res,next ) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.CLIENT_ID
        })
        .then( ticket => {
            payload = ticket.getPayload()
            return User.findOne({email: payload.email})
        })
        .then( user => {
            if(user) return user
            else {
                User.create({
                    name: payload.name,
                    email: payload.email,
                    password: process.env.DEFAULT_PASSWORD
                })
            }
        })
        .then( user => {
            let token = generateToken({id:user._id})
            res.status(201).json({token})
        })
        .catch( next )
    }

}

module.exports = userController