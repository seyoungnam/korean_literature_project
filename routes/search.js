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
      const sort_by = request.query.sort_by || 'work_title';
      const genre = request.query.genre;
      const author_kr = request.query.author_kr;
      const translator = request.query.translator;
      const year = request.query.year;
      console.log('keyword=', keyword);
      console.log('sort_by=', sort_by);
      console.log('genre=', genre);
      console.log('author_kr=', author_kr);
      console.log('translator=', translator);
      console.log('year=', year);

      let books = await searchService.getListKeyword(keyword);
      const genres = await searchService.getGenreFilter(books);
      const author_krs = await searchService.getAuthorKrFilter(books);
      const translators = await searchService.getTranslatorFilter(books);
      const years = await searchService.getYearFilter(books);

      let books_genre_filter = [];
      let books_author_kr_filter = [];
      let books_translator_filter = [];
      let books_year_filter = [];
      let books_total_filter = [];
      if (genre) {
        books_genre_filter = await searchService.getListByCategoryEqual(books, 'genre', genre);
      }
      if (author_kr) {
        books_author_kr_filter = await searchService.getListByCategoryEqual(
          books,
          'author_kr',
          author_kr
        );
      }
      if (translator) {
        books_translator_filter = await searchService.getListByCategoryEqual(
          books,
          'translator',
          translator
        );
      }
      if (year) {
        books_year_filter = await searchService.getListByCategoryEqual(books, 'year', year);
      }
      books_total_filter = [
        ...books_genre_filter,
        ...books_author_kr_filter,
        ...books_translator_filter,
        ...books_year_filter,
      ].filter((ele, idx, arr) => arr.findIndex((t) => t.id === ele.id) === idx);
      console.log(books_total_filter);
      if (books_total_filter.length > 0) {
        books = books_total_filter;
      }

      books = await searchService.getSortedList(books, sort_by);

      return response.render('layout', {
        pageTitle: 'Search books',
        template: 'search',
        keyword,
        sort_by,
        books,
        genres,
        author_krs,
        translators,
        years,
        genre,
        author_kr,
        translator,
        year,
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
      const logics = request.query.logic;
      const categories = request.query.category;
      const keywords = request.query.keyword;
      const keyword = keywords[0];

      const sort_by = request.query.sort_by || 'work_title';

      const genre = request.query.genre;
      const author_kr = request.query.author_kr;
      const translator = request.query.translator;
      const year = request.query.year;

      let books = await searchService.getListAdvanced(categories, keywords, logics, sort_by);
      const genres = await searchService.getGenreFilter(books);
      const author_krs = await searchService.getAuthorKrFilter(books);
      const translators = await searchService.getTranslatorFilter(books);
      const years = await searchService.getYearFilter(books);

      let books_genre_filter = [];
      let books_author_kr_filter = [];
      let books_translator_filter = [];
      let books_year_filter = [];
      let books_total_filter = [];
      if (genre) {
        books_genre_filter = await searchService.getListByCategoryEqual(books, 'genre', genre);
      }
      if (author_kr) {
        books_author_kr_filter = await searchService.getListByCategoryEqual(
          books,
          'author_kr',
          author_kr
        );
      }
      if (translator) {
        books_translator_filter = await searchService.getListByCategoryEqual(
          books,
          'translator',
          translator
        );
      }
      if (year) {
        books_year_filter = await searchService.getListByCategoryEqual(books, 'year', year);
      }
      books_total_filter = [
        ...books_genre_filter,
        ...books_author_kr_filter,
        ...books_translator_filter,
        ...books_year_filter,
      ].filter((ele, idx, arr) => arr.findIndex((t) => t.id === ele.id) === idx);
      console.log(books_total_filter);
      if (books_total_filter.length > 0) {
        books = books_total_filter;
      }

      books = await searchService.getSortedList(books, sort_by);

      console.log(books);
      return response.render('layout', {
        pageTitle: 'Search books',
        template: 'search',
        keyword,
        sort_by,
        books,
        genres,
        author_krs,
        translators,
        years,
        genre,
        author_kr,
        translator,
        year,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
