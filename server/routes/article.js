const articleRouter = require("express").Router();
const { ArticleController } = require("../controllers/index");
const upload = require("../helpers/upload-gcs");
const authentication = require("../middlewares/authenticaton");

articleRouter.use(authentication);

articleRouter.post("/add", upload.single("image"), ArticleController.create);

articleRouter.get("/", ArticleController.findAll);

articleRouter.get("/myarticles", ArticleController.myArticle);

const authorization = require("../middlewares/authorization");

articleRouter.put(
  "/update/:id",
  authorization,
  upload.single("image"),
  ArticleController.update
);

articleRouter.delete("/delete/:id", authorization, ArticleController.delete);

module.exports = articleRouter;
