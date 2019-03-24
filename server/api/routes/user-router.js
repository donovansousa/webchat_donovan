
const UserController = require('../controllers/user-controller');

const express = require('../config/app').express;

const userRouter = express.Router();

userRouter.post('/',UserController.insert);
userRouter.get('/:name/:password',UserController.loginAndPasswordIsValid);

module.exports = userRouter;
