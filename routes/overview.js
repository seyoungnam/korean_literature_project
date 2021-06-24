const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { searchService, speakersService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const keyword = null;
      // const sort_by = work_title;
      const books = await searchService.getListAll();
      return response.render('layout', {
        pageTitle: 'Materials Overview',
        template: 'overview',
        books,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:genre', async (request, response, next) => {
    try {
      console.log(request.params.genre);
      const books = await searchService.getListByGenre(request.params.genre);
      return response.render('layout', {
        pageTitle: 'Materials Overview',
        template: 'overview',
        books,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/advanced', async (request, response, next) => {
    try {
      const categories = request.query.category;
      const keywords = request.query.keyword;
      const keyword = keywords[0];
      const logics = request.query.logic;
      const sort_by = request.query.sort_by;
      console.log(categories);
      console.log(keywords);
      console.log(logics);
      const books = await searchService.getListAdvanced(categories, keywords, logics, sort_by);
      const artwork = await speakersService.getAllArtwork();
      console.log(books);
      return response.render('layout', {
        pageTitle: 'Search books',
        template: 'search',
        // keywords,
        keyword,
        sort_by,
        books,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
