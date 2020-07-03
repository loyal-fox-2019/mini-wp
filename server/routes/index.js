const router = require('express').Router()
const usersRouter = require('./users')
const articlesRouter = require('./articles')
const subscribeRouter = require('./subscribe')
const pushRouter = require('./push')
const { authentication } = require('../middlewares/auth')

router.get('/', (req, res, next) => {
  res.locals.metaTags = {
      title: 'Mini-WP',
      description: 'Mini Wordpress API',
      // keywords: 'Web Push Notification Full Stack Application With Node Js Restful API',
      // generator: '0.0.0.1',
      author: 'Alvina'
  };
  res.send('Welcome to Mini-WP!');
});

router.all('*', function(req, res, next) {
  let path = req.url.split('/')[1]
  if (req.url !== '/' && path !== 'users' && path !== 'articles') {
    res.status(404).json({
      message: "Not found"
    });
  } else {
    next()
  }
})

router.use('/users', usersRouter)
router.use(authentication)
router.use('/articles', articlesRouter)
router.use('/subscribe', subscribeRouter)
router.use('/push', pushRouter)

// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

module.exports = router;