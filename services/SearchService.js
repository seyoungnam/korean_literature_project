const { constants } = require('buffer');
const fs = require('fs');
const util = require('util');

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching speakers information
 */
class SearchService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the master data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Fetches speakers data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    return JSON.parse(data).master;
  }

  /**
   * Returns a list of speakers name and short name
   */
  async getNames() {
    const data = await this.getData();

    // We are using map() to transform the array we get into another one
    return data.map((book) => {
      return { id: book.id, source_title: book.source_title, author: book.author };
    });
  }

  /**
   * Get a list of books
   */
  async getListAll() {
    const data = await this.getData();
    return data.map((book) => {
      return {
        id: book.id,
        genre: book.genre,
        work_title: book.work_title,
        author_kr: book.author_kr,
        author: book.author,
        translator: book.translator,
        source_title: book.source_title,
        publisher: book.publisher,
        published: book.published,
      };
    });
  }

  async getListKeyword(keyword, index) {
    const data = await this.getData();
    const answer = data.filter((book) =>
      Object.values(book)
        .map((val) => val.toLowerCase())
        .map((x) => x.includes(keyword.toLowerCase()))
        .filter((x) => x == true).length > 0
        ? true
        : false
    );

    answer.sort((a, b) => (a[index] == b[index] ? 0 : a[index] < b[index] ? -1 : 1));

    return answer.map((book) => {
      return {
        id: book.id,
        genre: book.genre,
        author_kr: book.author_kr,
        author: book.author,
        work_title: book.work_title,
        translator: book.translator,
        source_title: book.source_title,
        publisher: book.publisher,
        published: book.published,
      };
    });
  }

  async getListByGenre(genreVal) {
    const data = await this.getData();
    const answer = data.filter((book) => book.genre == genreVal);

    // answer.sort((a, b) => (a[index] == b[index] ? 0 : a[index] < b[index] ? -1 : 1));

    return answer.map((book) => {
      return {
        id: book.id,
        genre: book.genre,
        author_kr: book.author_kr,
        author: book.author,
        work_title: book.work_title,
        translator: book.translator,
        source_title: book.source_title,
        publisher: book.publisher,
        published: book.published,
      };
    });
  }

  async getDetailsById(id) {
    const data = await this.getData();
    const details = data.find((elm) => {
      return elm.id === id;
    });
    if (!details) return null;
    return {
      id: details.id,
      genre: details.genre,
      author_kr: details.author_kr,
      author: details.author,
      work_title: details.work_title,
      translator: details.translator,
      source_title: details.source_title,
      publisher: details.publisher,
      published: details.published,
    };
  }

  async getListByCategory(data, category, keyword) {
    if (category === 'any') {
      return data.filter((book) =>
        Object.values(book)
          .map((val) => val.toLowerCase())
          .map((x) => x.includes(keyword.toLowerCase()))
          .filter((x) => x == true).length > 0
          ? true
          : false
      );
    }
    // return data.filter((book) =>
    //   book[category]
    //     ? book[category].map((val) => val.toLowerCase()).includes(keyword.toLowerCase())
    //     : false
    // );
    return data.filter((book) =>
      !book[category]
        ? false
        : book[category].toLowerCase().includes(keyword.toLowerCase())
        ? true
        : false
    );
  }

  async getListAdvanced(categories, keywords, logics, sort_by) {
    const data = await this.getData();
    var answer;
    // console.log(typeof data);

    if (!keywords) {
      return null;
    }

    for (let i = 0; i < keywords.length; i++) {
      const logic = logics[i];
      const category = categories[i];
      const keyword = keywords[i].toLowerCase();

      console.log('getListAdvanced : ', logic, category, keyword);
      if (i === 0) {
        answer = await this.getListByCategory(data, category, keyword);
      } else {
        if (!keyword) {
          continue;
        }
        if (logic === 'and') {
          answer = await this.getListByCategory(answer, category, keyword);
        } else if (logic === 'or') {
          const answer_or = await this.getListByCategory(answer, category, keyword);
          answer = [...answer, ...answer_or].filter(
            (ele, idx, arr) => arr.findIndex((t) => t.id === ele.id) === idx
          );
        } else {
          const answer_not = await this.getListByCategory(answer, category, keyword);
          answer = answer.filter((x) => !answer_not.filter((y) => y.id === x.id).length);
        }
      }
      // console.log('getListAdvanced(each loop)', i, answer);
    }

    answer.sort((a, b) => (a[sort_by] == b[sort_by] ? 0 : a[sort_by] < b[sort_by] ? -1 : 1));

    return answer.map((book) => {
      return {
        id: book.id,
        genre: book.genre,
        author_kr: book.author_kr,
        author: book.author,
        work_title: book.work_title,
        translator: book.translator,
        source_title: book.source_title,
        publisher: book.publisher,
        published: book.published,
      };
    });
  }

  async getGenreFilter(books) {
    // genre
    const result_genre = books
      .map(({ genre }) => genre)
      .reduce((accumulator, curVal) => {
        const count = accumulator[curVal] || 0;
        accumulator[curVal] = count + 1;
        return accumulator;
      }, {});

    return { items: Object.keys(result_genre), val: Object.values(result_genre) };
  }

  async getAuthorKrFilter(books) {
    // author_kr
    const result_author_kr = books
      .map(({ author_kr }) => author_kr)
      .reduce((accumulator, curVal) => {
        const count = accumulator[curVal] || 0;
        accumulator[curVal] = count + 1;
        return accumulator;
      }, {});

    return { items: Object.keys(result_author_kr), val: Object.values(result_author_kr) };
  }

  async getPublishFilter(books) {
    // // genre
    // const result_genre = books
    //   .map(({ genre }) => genre)
    //   .reduce((accumulator, curVal) => {
    //     const count = accumulator[curVal] || 0;
    //     accumulator[curVal] = count + 1;
    //     return accumulator;
    //   }, {});
    // // author_kr
    // const result_author_kr = books
    //   .map(({ author_kr }) => author_kr)
    //   .reduce((accumulator, curVal) => {
    //     const count = accumulator[curVal] || 0;
    //     accumulator[curVal] = count + 1;
    //     return accumulator;
    //   }, {});
    // publisher
    const result_publisher = books
      .map(({ publisher }) => publisher)
      .reduce((accumulator, curVal) => {
        const count = accumulator[curVal] || 0;
        accumulator[curVal] = count + 1;
        return accumulator;
      }, {});

    return { items: Object.keys(result_publisher), val: Object.values(result_publisher) };
  }
}

module.exports = SearchService;