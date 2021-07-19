const express = require('express');

const router = express.Router();

module.exports = (params) => {
  // const { searchService } = params;
  const tableau = 'tableau';

  router.get('/', async (request, response, next) => {
    try {
      return response.render('layout', {
        pageTitle: 'Graphics',
        template: 'graphics',
        tableau,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
