
// Import All Routes
const userRouter = require('../routes/user-router');

// app
const app = require('../config/app').app;

// importa os routers
app.use('/api-v1/users',userRouter);

module.exports = app;