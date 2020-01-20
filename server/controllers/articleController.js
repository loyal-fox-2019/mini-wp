const _ = require("underscore");

const Article = require("../models/article");

// Imports the Google Cloud client libraries
const vision = require("@google-cloud/vision");
async function detectUnsafe(url) {
    // [START vision_safe_search_detection_gcs]

    //return false;
    if(!url)
    {
        return false;
    }
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    const bucketName = process.env.BUCKETNAME;
    const fileName = url.split('/').pop();
  
    // Performs safe search property detection on the remote file
    const [result] = await client.safeSearchDetection(
      `gs://${bucketName}/${fileName}`
    );
    const detections = result.safeSearchAnnotation;
    console.log(`${url} Adult: ${detections.adult}`);
    console.log(`${url} Medical: ${detections.medical}`);
    console.log(`${url} Violence: ${detections.violence}`);

    return detections.adult == "VERY_LIKELY" || detections.racy == "VERY_LIKELY" || detections.violence == "VERY_LIKELY" || detections.medical == "VERY_LIKELY" 
    // [END vision_safe_search_detection_gcs]
}

class ArticleController
{
    static showAllArticles(req,res,next)
    {
        Article.find().populate('author')
        .exec()
        .then(async (articles) => {
            for(let i=0;i<articles.length;i++)
            {
                let isUnsafe = await detectUnsafe(articles[i].featured_image)
                if(isUnsafe)
                {
                    articles[i].featured_image = "https://via.placeholder.com/400x400?text=Marked+as+unsafe";
                }
            }
            res.status(200).json(articles);
        })
        .catch((err) => {
            next(err);
        })
    }

    static showMyArticles(req,res,next)
    {
        Article.find({
            author: req.userInfo.id
        }).populate('author')
        .exec()
        .then(async (articles) => {
            for(let i=0;i<articles.length;i++)
            {
                let isUnsafe = await detectUnsafe(articles[i].featured_image)
                if(isUnsafe)
                {
                    articles[i].featured_image = "https://via.placeholder.com/400x400?text=Marked+as+unsafe";
                }
            }
            res.status(200).json(articles);
        })
        .catch((err) => {
            next(err);
        })
    }

    static showArticleById(req,res,next)
    {
        Article.findById(req.params.id).populate('author')
        .exec()
        .then(async (article) => {
            let isUnsafe = await detectUnsafe(article.featured_image)
            if(isUnsafe)
            {
                article.featured_image = "https://via.placeholder.com/400x400?text=Marked+as+unsafe";
            }
            res.status(200).json(article);
        })
        .catch((err) => {
            next(err);
        })
    }

    static addArticle(req,res,next)
    {
        const data = _.pick(req.body,'title','content','slug');
        data.author = req.userInfo.id;
        console.log(req.body)
        if(req.body.file)
        {
            data.featured_image = req.body.file;
        }
        
        Article.create(data)
        .then(async (article) => {
            let isUnsafe = await detectUnsafe(article.featured_image)
            if(isUnsafe)
            {
                article.featured_image = "https://via.placeholder.com/400x400?text=Marked+as+unsafe";
            }
            res.status(201).json(article);
        })
        .catch((err) => {
            next(err);
        });
    }
    
    static updateArticle(req,res,next)
    {
        const data = _.pick(req.body,'title','content');

        Article.findById(req.params.id)
        .exec()
        .then(async (article) => {
            if(article)
            {
                for(let key in article)
                {
                    if(data.hasOwnProperty(key))
                    {
                        article[key] = data[key];
                    }
                }

                return article.save()                
            }
            else
            {
                next({status: 404, message: "not found"})
            }
        })
        .then(async (updated) => {
            let isUnsafe = await detectUnsafe(updated.featured_image)
            if(isUnsafe)
            {
                updated.featured_image = "https://via.placeholder.com/400x400?text=Marked+as+unsafe";
            }
            res.status(201).json({
                msg: "update success",
                updated: updated
            });
        })
        .catch((err) => {
            next(err)
        });
    }

    static deleteArticle(req,res,next)
    {
        Article.findByIdAndDelete(req.params.id)
        .exec()
        .then(() => {
            res.sendStatus(204);
        })
        .catch((err) => {
            next(err);
        })
    }
}

module.exports = ArticleController;