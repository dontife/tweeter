$(document).ready(function() {
  $('#tweet-text').on("input", function() {
    const currentLength = $(this).val().length;
    const form = $(this).closest('form');
    const counter = form.find('.counter');
    counter.text(140-currentLength)
    
    if (currentLength > 140) {
      $(counter).addClass('selector')
    }   
  });
}); 


