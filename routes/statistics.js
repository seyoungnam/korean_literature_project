const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { searchService, speakersService } = params;

  router.get('/', async (request, response, next) => {
    try {
      return response.render('layout', {
        pageTitle: 'Literature Statistics',
        template: 'statistics',
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
