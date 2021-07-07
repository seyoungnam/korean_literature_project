const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');
const searchRoute = require('./search');
const overviewRoute = require('./overview');
const statisticsRoute = require('./statistics');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const artwork = await speakersService.getAllArtwork();
      const topSpeakers = await speakersService.getList();
      return response.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        topSpeakers,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));
  router.use('/search', searchRoute(params));
  router.use('/overview', overviewRoute(params));
  router.use('/statistics', statisticsRoute(params));

  return router;
};
