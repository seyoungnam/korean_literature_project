const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');
const SearchService = require('./services/SearchService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');
const searchService = new SearchService('./data/master.json');

const routes = require('./routes');

const app = express();

const port = process.env.port || 3000;

app.set('trust proxy', 1);

// url
app.use(async (req, res, next) => {
  try {
    res.locals.url = await searchService.urlCleaning(req.originalUrl);
    res.locals.host = req.get('host');
    res.locals.protocol = req.protocol;
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'Korean Literature Searching System';

app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
  try {
    const names = await speakersService.getNames();
    response.locals.speakerNames = names;
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(async (request, response, next) => {
  try {
    const books = await searchService.getNames();
    response.locals.bookNames = books;
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
    searchService,
  })
);

app.use((request, response, next) => {
  return next(createError(404, 'File not found'));
});

app.use((err, request, response, next) => {
  response.locals.message = err.message;
  console.error(err);
  const status = err.status || 500;
  response.locals.status = status;
  response.status(status);
  response.render('error');
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});
