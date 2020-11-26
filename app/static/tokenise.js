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

  $('body').on('click', '.token_button', function () {
    //console.log($(this));
    //console.log("here");
    $(this).toggleClass("btn-outline-success");
    $(this).toggleClass("btn-success");

    var id_hash = '#' + $(this).attr('id');
    var new_term_selector = id_hash + '.new_term';
    var button_selector = id_hash + '.token_button';

    if (Number($(this).attr("order")) == '-1') {
      var order = Number($(new_term_selector).attr("current_order"));
      $(this).attr("order", order);
      $(new_term_selector).attr("current_order", order + 1);
    }

    else {
      $(this).attr("order", '-1');
    }

    $(new_term_selector)[0].innerText= ' ';

    var new_text = ''
    var current_order = Number($(new_term_selector).attr("current_order"))
    for (let i = 0; i < current_order; i++ ) {
      $(button_selector).each(function( index ) {
        if (Number($(this).attr("order")) == i) {
          new_text = new_text + " " + $(this).text();
        }
      });
    }
    $(new_term_selector)[0].innerText = new_text;
  });

  $(".tokenise").on("click", function() {

		$(this).hide();

		console.log($(this));
    var id = $(this).attr('id');
		var id_hash = '#' + $(this).attr('id');
		var title_selector = id_hash + '.title';
		var description_selector = id_hash + '.description';
    var term_box_selector = id_hash + '.display';

		var title = $(title_selector).text(); //set to a variable
		var description = $(description_selector).text();


    var title_url = encodeURI("http://127.0.0.1:3000/tokeniser?input=" + title + "&seperator= ");
    var description_url = encodeURI("http://127.0.0.1:3000/tokeniser?input=" + description + "&seperator= ");

		$.ajax({
			url: description_url,
      type: 'GET',
      dataType: 'json',
      success: function(response) {

        $(description_selector)[0].innerHTML = " ";
        $(term_box_selector).removeClass("display");
        for (let i = 0; i < response["size"]; i++ ) {
          //console.log(response[i.toString()]);response[i.toString()]
          $(description_selector)[0].innerHTML += '<button id="' + id + '" type="button" order="-1" class="btn btn-outline-success token_button">' + response[i.toString()] + '</button>';
        }

		  },

			error: function(error) {
				console.log(error);
			}
		});

		$.ajax({
			url: title_url,
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        $(title_selector)[0].innerHTML = " ";
        $(term_box_selector).removeClass("display");
        for (let i = 0; i < response["size"]; i++ ) {
          //console.log(response[i.toString()]);response[i.toString()]
          $(title_selector)[0].innerHTML += '<button id="' + id + '" type="button" order="-1" class="btn btn-outline-success token_button">' + response[i.toString()] + '</button>';
					$("a").removeAttr('href');
        }

		  },

			error: function(error) {
				console.log(error);
			}
		});

		console.log($(this));

	});
});
