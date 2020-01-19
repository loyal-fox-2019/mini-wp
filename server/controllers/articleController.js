const Article = require('../models/Article');

class articleController {
    // Show all articles
    static findAll(req, res, next) {
        Article.findAll()
        .then((result) => {
            res.status(200);
            res.json(result);
        }).catch((err) => {
            next(err);
        });
    }

    // Create article
    static create(req, res, next) {
        const {token} = req.headers;
        const {title, content, slug, featured_image} = req.body;
        Article.create({
            title,
            content,
            slug,
            featured_image,
            author: token._id
        })
        .then((result) => {
            res.status(200);
            res.json(result);
        }).catch((err) => {
            next(err);
        });
    }

    // Edit article
    static edit(req, res, next) {
    }
}

module.exports = articleController;