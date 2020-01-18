const usersRouter = require("express").Router();

const UserController = require("../controllers/userController");

const authentication = require("../middlewares/authentication");
const authorisation = require("../middlewares/authorisation").user_authorisation;

usersRouter.post('/register',(req,res,next) => {
    //res.send('add User');
    UserController.addUser(req,res,next);
});

usersRouter.post('/login',(req,res,next) => {
    //res.send('login User');
    UserController.loginUser(req,res,next);
});

usersRouter.post('/gsignin',(req,res,next) => {
    res.send('Google login User');
    //UserController.gLoginUser(req,res,next);
})

usersRouter.use('/',authentication);

usersRouter.get('/',(req,res,next) => {
    res.send('User list');
    //UserController.showAllUsers(req,res,next);
});

usersRouter.get('/:id',(req,res,next) => {
    res.send('User detail');
    //UserController.showUserById(req,res,next);
});

usersRouter.put('/:id',authorisation,(req,res,next) => {
    res.send('update User');
    //UserController.updateUser(req,res,next);
});

usersRouter.patch('/:id',authorisation,(req,res,next) => {
    res.send('update User');
    //UserController.updateUser(req,res,next);
});

usersRouter.delete('/:id',authorisation,(req,res,next) => {
    res.send('delete User');
    //UserController.deleteUser(req,res,next);
});

module.exports = usersRouter;