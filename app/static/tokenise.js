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

	//when a word is selected add it to the key term builder
  $('body').on('click', '.token_button', function () {

		//fill button when in selected state
    $(this).toggleClass("btn-outline-success");
    $(this).toggleClass("btn-success");

		//get the selectors for each button and the term builder box of the news story
    var id_hash = '#' + $(this).attr('id');
    var new_term_selector = id_hash + '.new_term';
    var button_selector = id_hash + '.token_button';

		//if the term has not been selected then add it to the end of the builder queue
    if (Number($(this).attr("order")) == '-1') {
      var order = Number($(new_term_selector).attr("current_order"));
      $(this).attr("order", order);
      $(new_term_selector).attr("current_order", order + 1);
    }

		//if the term has already been selected then deselect it and remove it form builder queue
    else {
      $(this).attr("order", '-1');
    }

		//clear currently built term
    $(new_term_selector)[0].innerText= ' ';

		//build key term in the order in which the terms were selected
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

	//turns words of news story into buttons that can be pressed to build a key term
  $(".tokenise").on("click", function() {


		$(this).hide(); //hide button to prevent double tokenisation

		////get the selectors of the words to be tokenised and the builder box
    var id = $(this).attr('id');
		var id_hash = '#' + $(this).attr('id');
		var title_selector = id_hash + '.title';
		var description_selector = id_hash + '.description';
    var term_box_selector = id_hash + '.display';

		//get words to be tokenised
		var title = $(title_selector).text();
		var description = $(description_selector).text();

		//generate URI to send tokenise request to
    var title_url = encodeURI("http://127.0.0.1:3000/tokeniser?input=" + title + "&seperator= ");
    var description_url = encodeURI("http://127.0.0.1:3000/tokeniser?input=" + description + "&seperator= ");

		//replaces all description words with buttons
		$.ajax({
			url: description_url,
      type: 'GET',
      dataType: 'json',
      success: function(response) {

        $(description_selector)[0].innerHTML = " ";
        $(term_box_selector).removeClass("display");
        for (let i = 0; i < response["size"]; i++ ) {
          $(description_selector)[0].innerHTML += '<button id="' + id + '" type="button" order="-1" class="btn btn-outline-success token_button">' + response[i.toString()] + '</button>';
        }

		  },

			error: function(error) {
				console.log(error);
			}
		});

		//replaces all title words with buttons
		$.ajax({
			url: title_url,
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        $(title_selector)[0].innerHTML = " ";
        $(term_box_selector).removeClass("display");
        for (let i = 0; i < response["size"]; i++ ) {
          $(title_selector)[0].innerHTML += '<button id="' + id + '" type="button" order="-1" class="btn btn-outline-success token_button">' + response[i.toString()] + '</button>';
					$("a").removeAttr('href'); //remove link to news article from buttons
        }

		  },

			error: function(error) {
				console.log(error);
			}
		});
	});
});
