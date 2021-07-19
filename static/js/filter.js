const url = new URL(window.location.href);
let params = new URLSearchParams(url.search);

console.log(url);
var lists = document.querySelector('.nav-menu-lists');
var search = document.querySelector('.nav-menu-search');

if (url.pathname.includes('lists')) {
  lists.classList.toggle('is-active');
}
if (url.pathname.includes('search')) {
  search.classList.toggle('is-active');
}

let base_url = new URL(url.protocol + url.host + url.pathname) + '?';
const genre_cbox = document.querySelectorAll('.genre_filter');
const author_kr_cbox = document.querySelectorAll('.author_kr_filter');
const translator_cbox = document.querySelectorAll('.translator_filter');
const year_cbox = document.querySelectorAll('.year_filter');
const genre_params = url.searchParams.getAll('genre');
const author_kr_params = url.searchParams.getAll('author_kr');
const translator_params = url.searchParams.getAll('translator');
const year_params = url.searchParams.getAll('year');
// genre_checkbox
for (let i = 0; i < genre_cbox.length; i++) {
  if (genre_params.includes(genre_cbox[i].value)) {
    genre_cbox[i].checked = true;
  }
  genre_cbox[i].addEventListener('click', function (e) {
    if (genre_cbox[i].checked) {
      location.replace(window.location.href + '&genre=' + genre_cbox[i].value);
    } else {
      params.forEach((val, key) =>
        (key == 'genre') & (val == genre_cbox[i].value)
          ? (base_url += '')
          : (base_url += '&' + key + '=' + val)
      );
      location.replace(base_url);
    }
  });
}

// author_kr_checkbox
for (let i = 0; i < author_kr_cbox.length; i++) {
  if (author_kr_params.includes(author_kr_cbox[i].value)) {
    author_kr_cbox[i].checked = true;
  }
  author_kr_cbox[i].addEventListener('click', function (e) {
    if (author_kr_cbox[i].checked) {
      location.replace(window.location.href + '&author_kr=' + author_kr_cbox[i].value);
    } else {
      params.forEach((val, key) =>
        (key == 'author_kr') & (val == author_kr_cbox[i].value)
          ? (base_url += '')
          : (base_url += '&' + key + '=' + val)
      );
      location.replace(base_url);
    }
  });
}

// translator_checkbox
for (let i = 0; i < translator_cbox.length; i++) {
  if (translator_params.includes(translator_cbox[i].value)) {
    translator_cbox[i].checked = true;
  }
  translator_cbox[i].addEventListener('click', function (e) {
    if (translator_cbox[i].checked) {
      location.replace(window.location.href + '&translator=' + translator_cbox[i].value);
    } else {
      params.forEach((val, key) =>
        (key == 'translator') & (val == translator_cbox[i].value)
          ? (base_url += '')
          : (base_url += '&' + key + '=' + val)
      );
      location.replace(base_url);
    }
  });
}

// year_checkbox
for (let i = 0; i < year_cbox.length; i++) {
  if (year_params.includes(year_cbox[i].value)) {
    year_cbox[i].checked = true;
  }
  year_cbox[i].addEventListener('click', function (e) {
    if (year_cbox[i].checked) {
      location.replace(window.location.href + '&year=' + year_cbox[i].value);
    } else {
      params.forEach((val, key) =>
        (key == 'year') & (val == year_cbox[i].value)
          ? (base_url += '')
          : (base_url += '&' + key + '=' + val)
      );
      location.replace(base_url);
    }
  });
}

function removeURLParameter(url, parameter) {
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split('?');
  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(parameter) + '=';
    var pars = urlparts[1].split(/[&;]/g);

    //reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0; ) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    url = urlparts[0] + '?' + pars.join('&');
    return url;
  } else {
    return url;
  }
}

const breadcrumb_genre = document.getElementById('breadcrumb_genre');
breadcrumb_genre.addEventListener('click', function (e) {
  // const new_url = removeURLParameter(window.location.href, 'genre');
  // location.replace(new_url);
  params.forEach((val, key) =>
    (key == 'genre') & (val == breadcrumb_genre.value)
      ? (base_url += '')
      : (base_url += '&' + key + '=' + val)
  );
  location.replace(base_url);
});
