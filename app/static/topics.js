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


	$( "#getNews" ).on("click", function() {

		var key_term = $("#key_terms")[0].value;
		var topic = $("#topic")[0].value;
		window.location.href = ("/news/" + key_term + "/" + topic);
		logger.log('here');

	});

	$( "#topic" ).change(function() {
  	var topic = $(this)[0].value;

		var url = encodeURI("https://topic-builder.herokuapp.com/topic/" + topic);

		console.log('url');

		//replaces all description words with buttons
		$.ajax({
			url: url,
      type: 'GET',
      dataType: 'json',
      success: function(response) {

				console.log(response);

				$("#key_terms").empty();

				if (response.keyterms == undefined ) {
					console.log('undefined');
					$('#getNews').prop('disabled', true);
				}

				else {
					$.each(response.keyterms, function (key, value) {
							$('button').prop('disabled', false);
	            $("#key_terms").append($('<option></option>').val(value.name).html(value.name));
	        });
				}

		  },

			error: function(error) {
				console.log(error);
			}
		});


	});

  $("#addTopic").on("click", function() {

		var topic = $("#new_topic_name")[0].value.trim();

    var url = encodeURI("https://topic-builder.herokuapp.com/createTopic?name=" + topic);

		//replaces all description words with buttons
		$.ajax({
			url: url,
      type: 'POST',
      dataType: 'json',
      success: function(response) {

				//empty error check here
				location.reload();

		  },

			error: function(error) {
				console.log(error);
			}
		});
	});

	$("#addKeyterm").on("click", function() {

		var keyterm = $("#new_keyterm_name")[0].value.trim();
		var topic = $("#select_term_topic")[0].value;

    var url = encodeURI("https://topic-builder.herokuapp.com/createKeyterm?name=" + keyterm + "&topic_id=" + topic);

		console.log(url);

		//replaces all description words with buttons
		$.ajax({
			url: url,
      type: 'POST',
      dataType: 'json',
      success: function(response) {

				//empty error check here
				location.reload();

		  },

			error: function(error) {
				console.log(error);
			}
		});
	});

	$(".confirm").on("click", function() {

		var id_hash = '#' + $(this).attr('id');
    var new_term_selector = id_hash + '.new_term';
		var keyterm = $(new_term_selector)[0].value.trim();

		console.log(new_term_selector);
		console.log(keyterm);

		window.location.href = ("/addterm" + "/" + keyterm);

		});
});
