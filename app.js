const fs = require('fs');
const express = require('express');
const app = express();
const skillsRouter = require('./routes/skillsRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const notificationRouter = require('./routes/notificationRoutes');
const messagesRouter = require('./routes/messages');
const errorHandler = require('./middleware/errorHandler');
// Import your messages controller
const dotenv = require('dotenv');

dotenv.config();

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/v1/skills', skillsRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/notifications/', notificationRouter);
app.use('/api/v1/messages/', messagesRouter);


app.use('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

// ERROR HANDLING MIDDLEWARE
app.use(errorHandler);
app.use(globalErrorHandler);

module.exports =  app; // Export both app and server instances

