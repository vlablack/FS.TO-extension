$(document).ready(function() {

	$('.item-info tr:last').after("<tr><td></td><td><div id='IMDb_Rating' class='kp_imdb_rating'></div><div class='kp_imdb_rating' id='KP_Rating'></div></td></tr>");
	var movie_title = $(".b-tab-item__title-origin").html();
	var movie_year = $('.item-info tr').eq(1).find("td").eq(1).text();
	movie_year = movie_year.split(' ').join('');
	movie_year = movie_year.split("–")[0];
	movie_year = movie_year.replace( /^\D+/g, '');
	console.log(movie_year);
	LoadIMDbRating(movie_title, movie_year);
	var movie_title_ru = $(".b-tab-item__title-inner").find("span[itemprop='name']").html().trim();

	LoadKPRating(movie_title_ru, movie_year);

});