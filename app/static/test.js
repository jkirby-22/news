
$(document).ready(function() {
	$(".tokenise").on("click", function() {

	  var clicked_obj = $(this);
		var id = '#' + $(this).attr('id');
		var title_selector = id + '.title';
		var description_selector = id + '.description';

		var title = $(title_selector).text();
		var description = $(description_selector).text();

		var title_url = encodeURI("http://127.0.0.1:3000/tokeniser?input=" + title + "&seperator= ")
		console.log(title_url)

	});
});
