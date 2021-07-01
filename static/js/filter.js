// https://stackoverflow.com/questions/40693232/add-checkbox-values-to-a-link-using-javascript
// $(document).ready(function () {
// const cur_url = window.location.href;
// var apply_button_genre = document.getElementById('genre_filter_apply');
// var apply_button_author_kr = document.getElementById('author_kr_filter_apply');
// var apply_button_translator = document.getElementById('translator_filter_apply');
// var apply_button_year = document.getElementById('year_filter_apply');

// $('#genre_filter').on('change', function () {
//   apply_button_genre.style.display = 'block';
//   var values = [];
//   $('.form-check-input:checked').each(function () {
//     var result = 'genre=' + $(this).val();
//     values.push(result);
//   });
//   $('.genre_filter_apply').attr('href', cur_url + '&' + values.join('&'));
// });

// $('#author_kr_filter').on('change', function () {
//   apply_button_author_kr.style.display = 'block';
//   var values = [];
//   $('.form-check-input:checked').each(function () {
//     var result = 'author_kr=' + $(this).val();
//     values.push(result);
//   });
//   $('.author_kr_filter_apply').attr('href', cur_url + '&' + values.join('&'));
// });

// $('#translator_filter').on('change', function () {
//   apply_button_translator.style.display = 'block';
//   var values = [];
//   $('.form-check-input:checked').each(function () {
//     var result = 'translator=' + $(this).val();
//     values.push(result);
//   });
//   $('.translator_filter_apply').attr('href', cur_url + '&' + values.join('&'));
// });

// $('#year_filter').on('change', function () {
//   apply_button_year.style.display = 'block';
//   var values = [];
//   $('.form-check-input:checked').each(function () {
//     var result = 'year=' + $(this).val();
//     values.push(result);
//   });
//   $('.year_filter_apply').attr('href', cur_url + '&' + values.join('&'));
// });

const url = new URL(window.location.href);
let params = new URLSearchParams(url.search);

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

// sort_by
// const sort_by_button = document.querySelector('#dropdownMenuButton');
// const sort_by_title = document.getElementById('sort_by_title');
// const sort_by_sorce = document.getElementById('sort_by_source');
// const sort_by_author = document.getElementById('sort_by_author');
// const sort_by_author_kr = document.getElementById('sort_by_author_kr');
// const sort_by_translator = document.getElementById('sort_by_translator');
// const sort_by_publisher = document.getElementById('sort_by_publisher');
// const sort_by_year = document.getElementById('sort_by_year');

// sort_by_button.addEventListener('click', function (e) {
//   if (params.has('sort_by')) {
//     params.set('sort_by', 'work_title');
//     document.getElementById('sort_by_title').href = base_url + params;
//     params.set('sort_by', 'source_title');
//     document.getElementById('sort_by_source').setAttribute("href", base_url + params);
//     params.set('sort_by', 'author');
//     document.getElementById('sort_by_author').setAttribute("href", base_url + params);
//     params.set('sort_by', 'author_kr');
//     document.getElementById('sort_by_author_kr').setAttribute("href", base_url + params);
//     params.set('sort_by', 'translator');
//     document.getElementById('sort_by_translator').setAttribute("href", base_url + params);
//     params.set('sort_by', 'publisher');
//     document.getElementById('sort_by_publisher').setAttribute("href", base_url + params);
//     params.set('sort_by', 'year');
//     document.getElementById('sort_by_year').setAttribute("href", base_url + params);
//   } else {
//     document.querySelector('#sort_by_title').href = window.location.href + '&sort_by=work_title';
//     document.querySelector('#sort_by_source').href = window.location.href + '&sort_by=source_title';
//     document.querySelector('#sort_by_author').href = window.location.href + '&sort_by=author';
//     document.querySelector('#sort_by_author_kr').href = window.location.href + '&sort_by=author_kr';
//     document.querySelector('#sort_by_translator').href = window.location.href + '&sort_by=translator';
//     document.querySelector('#sort_by_publisher').href = window.location.href + '&sort_by=publisher';
//     document.querySelector('#sort_by_year').href = window.location.href + '&sort_by=year';
//   }
// }

// document.getElementById('sort_by_title').href = url + '&sort_by=work_title';
// document.getElementById('sort_by_source').href = url + '&sort_by=source_title';
// document.getElementById('sort_by_author').href = url + '&sort_by=author';
// document.getElementById('sort_by_author_kr').href = window.location.href + '&sort_by=author_kr';
// document.getElementById('sort_by_translator').href = window.location.href + '&sort_by=translator';
// document.getElementById('sort_by_publisher').href = window.location.href + '&sort_by=publisher';
// document.getElementById('sort_by_year').href = window.location.href + '&sort_by=year';

// sort_by_source.addEventListener('click', function (e) {
//   if (params.has('sort_by')) {
//     params.set('sort_by', 'source_title');
//     location.replace(base_url + params);
//   } else {
//     location.replace(window.location.href + '&sort_by=source_title');
//   }
// }

// sort_by_author.addEventListener('click', function (e) {
//   if (params.has('sort_by')) {
//     params.set('sort_by', 'author');
//     location.replace(base_url + params);
//   } else {
//     location.replace(window.location.href + '&sort_by=author');
//   }
// }

// sort_by_author_kr.addEventListener('click', function (e) {
//   if (params.has('sort_by')) {
//     params.set('sort_by', 'author_kr');
//     location.replace(base_url + params);
//   } else {
//     location.replace(window.location.href + '&sort_by=author_kr');
//   }
// }

// sort_by_translator.addEventListener('click', function (e) {
//   if (params.has('sort_by')) {
//     params.set('sort_by', 'translator');
//     location.replace(base_url + params);
//   } else {
//     location.replace(window.location.href + '&sort_by=translator');
//   }
// }

// sort_by_publisher.addEventListener('click', function (e) {
//   if (params.has('sort_by')) {
//     params.set('sort_by', 'publisher');
//     location.replace(base_url + params);
//   } else {
//     location.replace(window.location.href + '&sort_by=publisher');
//   }
// }

// sort_by_year.addEventListener('click', function (e) {
//   if (params.has('sort_by')) {
//     params.set('sort_by', 'year');
//     location.replace(base_url + params);
//   } else {
//     location.replace(window.location.href + '&sort_by=year');
//   }
// }

// Init link on page load
// $('.form-check-input').trigger('change');
// });

// <% for (let i = 0; i < locals.genres.items.length; i++) { %>
//     console.log('23343');
//     console.log("<%= genres.items[i] %>")
// <% } %>
// var url = window.location.href;
// var form = document.getElementById('genre_filter');

// var checkBox = document.querySelector('#Fiction');
// var text = document.getElementById('text');
// checkBox.addEventListener('change', function (e) {
//   if (checkBox.checked) {
//     // total = '';
//     // for (i = 0; i < document.genre_filter.scripts.length; i++) {
//     //   if (document.genre_filter.scripts[i].checked) {
//     //     total += document.genre_filter.scripts[i].value;
//     //   }
//     // }
//   } else {
//     text.style.display = 'none';
//   }
// });
