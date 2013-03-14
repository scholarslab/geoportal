/*global $:false, jQuery:false */
var console = console || {};

$(document).ready(function(){

  // Load additional results when users click the "more results" button
  $('#more-link').click(function(){

    // Replace button with loading animation
    $(this).html('<img src="/images/loading.gif"/>');

    // Retrieve next page via Ajax and append content to current page
    $.get($(this).attr('href'), function(html) {
      var res = $(html).find('.result');
      $("#results").append(res);
    });

    // Change from loading animation to button text after content loads
    $(document).ajaxComplete(function(){
      $(this).html('View more results');
    });

    // Hide the "more results" button if no more results exist
    $(this).attr('href', function(){

      // Retrieve offset from s param
      var nxt = $(this).attr('href').split(/s=(\d+)/);

      // If the offset of the next page is less than the total number of hits,
      // there is another page of results
      if(parseInt(nxt[1], 10) < parseInt($('#hits').text(), 10)) {
        nxt[1] = 's=' + (parseInt(nxt[1], 10) + 25);					
        console.log(nxt);
      } else {
        $(this).hide();
      }

      // Re-join and return the href
      return nxt.join('');
    });

    // Supress default action
    return false;
  });
});
