$(document).ready(function () {
  var max_fields = 10;
  var add_button = $('.add_input_button');
  var delete_button = $('.delete_input_button');
  var x = 2;

  $(add_button).click(function (e) {
    e.preventDefault();
    if (x < max_fields) {
      x++;
      $('#candidate_wrapper .candidate')
        .clone()
        .find('input')
        .val('')
        .end()
        .appendTo('.add_input_field');

      $('.add_input_field #logic_1').attr('id', 'logic_' + String(x));
      $('.add_input_field #category_1').attr('id', 'category_' + String(x));
      $('.add_input_field #keyword_1').attr('id', 'keyword_' + String(x));
    }
  });

  $('body').on('click', '.delete_input_button', function (e) {
    e.preventDefault();
    if (x > 1) {
      x--;
      $('.add_input_field .candidate').last().remove();
    }
  });

  const urlSearchParams = new URLSearchParams(window.location.search);
  const logics = urlSearchParams.getAll('logic');
  const categories = urlSearchParams.getAll('category');
  const keywords = urlSearchParams.getAll('keyword');
  var path = window.location.pathname;
  if (path == '/search/advanced') {
    $('#advanced_search_input').addClass('show');
    for (let x = 2; x < categories.length; x++) {
      $('#candidate_wrapper .candidate')
        .clone()
        .find('input')
        .val('')
        .end()
        .appendTo('.add_input_field');

      $('.add_input_field #logic_1').attr('id', 'logic_' + String(x));
      $('.add_input_field #category_1').attr('id', 'category_' + String(x));
      $('.add_input_field #keyword_1').attr('id', 'keyword_' + String(x));
    }
  }

  // const params = Object.fromEntries(urlSearchParams.entries());
  console.log('categories=', categories);
  if (logics) {
    for (let i = 1; i < logics.length; i++) {
      let logic_id = '#logic_' + String(i);
      $(logic_id).val(logics[i]).change();
    }
  }
  if (categories) {
    for (let i = 0; i < categories.length; i++) {
      let category_id = '#category_' + String(i);
      $(category_id).val(categories[i]).change();
    }
  }
  if (keywords) {
    for (let i = 0; i < keywords.length; i++) {
      let keyword_id = '#keyword_' + String(i);
      $(keyword_id).val(keywords[i]).change();
    }
  }

  // modal id
  for (let i = 0; i < 5000; i++) {
    let id_start = '#modal_start_' + i;
    let id_target = '#modal_target_' + i;
    $(id_start).click(function (e) {
      e.preventDefault();
      $(id_target).modal('show');
    });
  }
});
