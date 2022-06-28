const path = require('path');
const express = require('express');
// const favicon = require('serve-favicon');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const fileRouter = require('./routes/fileRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const proofRouter = require('./routes/proofRoutes');
const productRouter = require('./routes/productRoutes');

const app = express();

app.set('view engine', 'pug');
// app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// GLOBAL MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// credentials
app.use((req, res, next) => {
  const { origin } = req.headers;
  if (['http://localhost:3000'].includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
});

// implement cors
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

app.options(
  '*',
  cors({
    origin: 'http://localhost:3000'
  })
);

// serving static files
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// set security http headers
app.use(helmet());

// development logging
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// data sanitazation against XSS
app.use(xss());

app.use(compression());

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);

  next();
});

app.use('/', viewRouter);
app.use('/api/v1/files', fileRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/proofs', proofRouter);
app.use('/api/v1/products', productRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
