$(document).ready(function() {

  $('form').on('submit', function (e) {
    e.preventDefault();
    var $searchField = $('#search');
    var $submitButton = $('#submit');
    // Disable the search field and button during AJAX processing
    $searchField.prop('disabled', true);
    $submitButton.attr('disabled', true).val('Searching...');

    // AJAX $.getJSON(url, data, callback);
    
    // Parameter 1: URL
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
   
    // Parameter 2: Data
    var animal = $searchField.val(); 
    var flickrOptions = {
      tags: animal,
      format: "json"
    };
    
    // Parameter 3: Callback function
    function displayPhotos(data) {
      var photoHTML = '<ul>';
      
      $.each(data.items,function(i,photo) {
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      }); // end each
      
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
      // Reset the button and search field after AJAX processing
      $searchField.prop('disabled', false);
      $submitButton.attr('disabled', false).val('Search');
    }
   
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

  }); // end click

}); // end ready