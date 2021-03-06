const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const { errors, celebrate, Joi } = require('celebrate');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const userController = require('./controllers/user');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { pageNotFound } = require('./middlewares/pageNotFound');
const { auth } = require('./middlewares/auth');
const { errorHandling } = require('./middlewares/errorHandling');
const { myRegex } = require('./utils/utils');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const limiterConfig = {
  windowMs: 15 * 60 * 1000,
  max: 100,
	standardHeaders: true,
	legacyHeaders: false,
};

const limiter = rateLimit(limiterConfig);

const app = express();

const { PORT = 3000 } = process.env;

app.use(requestLogger);
app.use(limiter);
app.use(cors({
  origin: 'https://amir.projects.mesto.nomoredomains.sbs',
  credentials: true,
}));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), userController.login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(myRegex)),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), userController.createUser);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('/', auth, pageNotFound);
app.use(errorLogger);
app.use(errors());
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Server listen port: ${PORT}`);
});
