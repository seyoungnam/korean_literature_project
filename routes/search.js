const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { searchService, speakersService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const keyword = null;
      const sort_by = 'work_title';
      const books = await searchService.getListAll();
      const artwork = await speakersService.getAllArtwork();
      return response.render('layout', {
        pageTitle: 'Search books',
        template: 'search',
        keyword,
        sort_by,
        books,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/all', async (request, response, next) => {
    try {
      const keyword = request.query.keyword;
      const sort_by = request.query.sort_by;
      console.log(keyword);
      console.log(sort_by);
      const books = await searchService.getListKeyword(keyword, sort_by);
      const genres = await searchService.getGenreFilter(books);
      const author_krs = await searchService.getAuthorKrFilter(books);
      const publishers = await searchService.getPublishFilter(books);
      // console.log('filters: ', filters);
      // const artwork = await speakersService.getAllArtwork();
      return response.render('layout', {
        pageTitle: 'Search books',
        template: 'search',
        keyword,
        sort_by,
        books,
        genres,
        author_krs,
        publishers,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/details/:id', async (request, response, next) => {
    try {
      const details = await searchService.getDetailsById(request.params.id);
      return response.render('layout', {
        pageTitle: 'Details',
        template: 'book-details',
        details,
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
      const genres = await searchService.getGenreFilter(books);
      const author_krs = await searchService.getAuthorKrFilter(books);
      const publishers = await searchService.getPublishFilter(books);
      console.log(books);
      return response.render('layout', {
        pageTitle: 'Search books',
        template: 'search',
        // keywords,
        keyword,
        sort_by,
        books,
        genres,
        author_krs,
        publishers,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
