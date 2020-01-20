const Article = require('../models/article')

class articleController {

    static getTag ( req,res,next ) {
        Article.find({tags:req.params.tag})
            .then( articles => res.status(200).json(articles))
            .catch( next )
    }

    static create ( req,res,next ) {
        console.log(req.body)
        let tags
        if(req.body.tags.length>1) {
            tags = req.body.tags.split(' ')
        } else {
            tags = [req.body.tags]
        }
        Article.create({
            title: req.body.title,
            content: req.body.content,
            author: req.decoded.id,
            tags: tags,
            featured_image: req.body.featured_image
        })
            .then( article => res.status(201).json( article ) )
            .catch( next )
    }

    static get ( req,res,next ) {
        Article.find()
        .populate('author')
            .then( articles => res.status(200).json( articles ) )
            .catch( next )
    }

    static getUser ( req,res,next ) {
        Article.find({author: req.decoded.id})
        .populate('author')
            .then( articles => res.status(200).json( articles ))
            .catch( next )
    }

    static update ( req,res,next ) {
        let tags 
        if(req.body.tags.length>1) {
            tags = req.body.tags.split(' ')
        } else {
            tags = [req.body.tags]
        }
        Article.updateOne( { _id: req.params.id }, {
            $set: {
                title: req.body.title,
                content: req.body.content,
                tags: tags,
                featured_image: req.body.featured_image
            }
        } )
            .then( result => res.status(201).json( result ) )     
            .catch( next )   
    }

    static delete ( req,res,next ) {
        Article.deleteOne( { _id: req.params.id } )
            .then( result => res.status(201).json( result ) )
            .catch( next )
    }
}

module.exports = articleController