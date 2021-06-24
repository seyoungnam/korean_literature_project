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

  getListByCategory(data, category, keyword) {
    console.log(category, keyword);
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
    return data.filter((book) => (book[category] ? book[category].includes(keyword) : false));
  }

  async getListAdvanced(categories, keywords, logics, sort_by) {
    var data = await this.getData();
    var answer = [];

    if (!keywords) return null;

    for (let i = 0; i < keywords.length; i++) {
      const logic = logics[i];
      const category = categories[i];
      const keyword = keywords[i].toLowerCase();
      console.log(logic, category, keyword);
      if (i === 0) {
        answer = this.getListByCategory(data, category, keyword);
      } else {
        if (!keyword) {
          continue;
        }
        if (logic === 'and') {
          answer = this.getListByCategory(answer, category, keyword);
        } else if (logic === 'or') {
          const answer_or = this.getListByCategory(answer, category, keyword);
          answer = [...answer, ...answer_or].filter(
            (ele, idx, arr) => arr.findIndex((t) => t.id === ele.id) === idx
          );
        } else {
          const answer_not = this.getListByCategory(answer, category, keyword);
          answer = answer.filter((x) => !answer_not.filter((y) => y.id === x.id).length);
        }
      }
      console.log('getListAdvanced(each loop)', i, answer);
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
}

module.exports = SearchService;
