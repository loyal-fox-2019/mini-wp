'use strict'

const { Article } = require('../models')

module.exports = (req, res, next) => {
  Article
    .findById({ _id: req.params.id })
    .then( article => {
      if(article) {
        if(article.author == req.decoded.id) {
          next ()
        } else {
          next({
            status: 403,
            message: 'You dont have permission to do action'
          })
        }
      } else {
        next({
          status: 404,
          message: 'There is no article with that id'
        })
      }
    })
    .catch(next)
}