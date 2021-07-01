$(document).ready(function () {
  var max_fields = 10;
  var add_button = $('.add_input_button');
  var delete_button = $('.delete_input_button');
  var x = 1;

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
    }
  });

  $('body').on('click', '.delete_input_button', function (e) {
    e.preventDefault();
    if (x > 1) {
      x--;
      $('.add_input_field .candidate').last().remove();
    }
  });
});
