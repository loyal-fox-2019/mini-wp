'use strict'

const Article = require('../models/article')
const err = {status: 404, message: 'Article not found'}
const axios = require('axios')
// const pdfcrowd = require("pdfcrowd");
const querystring = require('querystring')

class ArticlesController {
  
  static create(req, res, next) {
    const { title, content } = req.body
    let arr = []
    req.body.tags.split(',').forEach(tag => {
      if (!arr.includes(tag.toLowerCase())) {
        arr.push(tag.toLowerCase())
      }
    })
    Article.create({ title, content, image: req.file.cloudStoragePublicUrl, tags: arr, author: req.decoded.id })
      .then(article => {
        res.status(201).json(article)
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    Article.find()
      .populate('author', 'name email image')
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static findMine(req, res, next) {
    Article.find({ author: req.decoded.id })
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static findBookmarks(req, res, next) {
    Article.find({ likes: req.decoded.id })
      .populate('author', 'name email image')
      .then(articles => {
        // console.log(articles)
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    Article.findById(req.params.id)
      .populate('author', 'name email image')
      .then(article => {
        if (!article) {
          next(err)
        } else {
          res.status(200).json(article)
        }
      })
      .catch(next)
  }

  static filter(req, res, next) {
    Article.find({ tags: req.params.tag })
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static search(req, res, next) {
    Article.find({ "title" : new RegExp(req.params.title, 'i') })
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static edit(req, res, next) {
    const { title, content } = req.body
    let arr = []
    req.body.tags.split(',').forEach(tag => {
      if (!arr.includes(tag.toLowerCase())) {
        arr.push(tag.toLowerCase())
      }
    })
    Article.findByIdAndUpdate(
      req.params.id,
      { title, content, image: req.file.cloudStoragePublicUrl, tags: arr },
      { new: true, runValidators: true, omitUndefined: true }
    )
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }

  static destroy(req, res, next) {
    Article.findByIdAndDelete(req.params.id)
      .then(article => {
        res.status(200).json({ message: `Article with ID ${article.id} successfully deleted!`})
      })
      .catch(next)
  }

  static like(req, res, next) {
    Article.findById(req.params.id)
      .then(article => {
        if (article.likes.includes(req.decoded.id)) {
          return Article.findByIdAndUpdate(req.params.id,
            { $pull: { likes: req.decoded.id }},
            { new: true, runValidators: true, omitUndefined: true }
          ) 
          
        } else {
          return Article.findByIdAndUpdate(req.params.id,
            { $addToSet: { likes: req.decoded.id }},
            { new: true, runValidators: true, omitUndefined: true }
          ) 
        }
      })
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }

  static addComment(req, res, next) {
    console.log(req.body)
    Article.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { comments: req.body.comment }},
      { new: true, runValidators: true, omitUndefined: true }
    )
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }

  static createTags(req, res, next) {
    axios({
      method: 'POST',
      url: `https://api.twinword.com/api/v5/topic/generate/`,
      headers: {
        "X-Twaip-Key": process.env.TWINWORD_KEY,
        "Host": "api.twinword.com",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        text: `${req.body.content}`
      })
    })
      .then(({ data }) => {
        res.status(201).json(data.keyword)
      })
      .catch(next)
  }

  static print(req, res, next) {
    // const client = new pdfcrowd.HtmlToPdfClient("demo", process.env.PDFCROWD_KEY);
    // try {
    //   client.setPageHeight("-1");
    // } catch(why) {
    //   console.error("Pdfcrowd Error: " + why);
    //   console.error("Pdfcrowd Error Code: " + why.getCode());
    //   console.error("Pdfcrowd Error Message: " + why.getMessage());
    //   process.exit(1);
    // }

    // client.convertStringToFile(
    //   `${req.body.text}`,
    //   "result.pdf",
    //   function(err, fileName) {
    //     if (err) return console.error("Pdfcrowd Error: " + err);
        // console.log("Success: the file was created " + fileName);
        // sendPdfInHttpResponse(response, fileName)
        // res.download(fileName)
        // res.contentType("application/pdf").send(fileName);
      // });
        // var content_disp = req.body.asAttachment ? 'attachment' : 'inline';
        // client.convertString(req.body.text, 
        //   pdfcrowd.sendPdfInHttpResponse(res, 'demo_express.pdf')
        // );

  }

}

module.exports = ArticlesController;