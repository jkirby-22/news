$(document).ready(function() {


	// Set the CSRF token so that we are not rejected by server
	var csrf_token = $('meta[name=csrf-token]').attr('content');
	// Configure ajaxSetupso that the CSRF token is added to the header of every request
  $.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrf_token);
	        }
	    }
	});


  $(".tokenise").on("click", function() {

	  var clicked_obj = $(this);
		var id = '#' + $(this).attr('id');
		var title_selector = id + '.title';
		var description_selector = id + '.description';

		var title = $(title_selector).text();
		var description = $(description_selector).text();


    var title_url = encodeURI("http://127.0.0.1:3000/tokeniser?input=" + title + "&seperator= ")
    var description_url = encodeURI("http://127.0.0.1:3000/tokeniser?input=" + description + "&seperator= ")


		$.ajax({
			url: description_url,
      type: 'GET',
      dataType: 'json',
      success: function(response)
				{
              console.log(response)

		    },
			error: function(error){
				console.log(error);
			}
		});

	});
});
