const { Article } = require("../models");
const { ObjectId } = require("mongoose").Types;
module.exports = (req, res, next) => {
  const { userInfo } = req;
  Article.findById({
    _id: ObjectId(req.params.id)
  })
    .then(article => {
      if (!article) {
        next({
          status: 404,
          msg: "article not found"
        });
      } else {
        if (article.userId != userInfo.id) {
          next({
            status: 403,
            msg: "Forbidden Access"
          });
        } else {
          next();
        }
      }
    })
    .catch(err => {
      next(err);
    });
};
