$(document).ready(function() {

    var movie_year, movie_title;
	console.log('works');
	if (isFSTO()) {
		console.log('it is FS');
        $('.item-info tr:last').after("<tr><td></td><td><table><tr><td><div id='IMDb_Rating' class='kp_imdb_rating'></div></td><td><div class='kp_imdb_rating' id='KP_Rating'></div></td></tr></table></td></tr>");

        movie_year = getMovieYear();
        movie_title = getMovieTitleForIMDB();
    } else if (isMegogo()) {
        $('.info_rating .infoi__content').html("<div id='KP_Rating'></div>\
        										<div id='IMDb_Rating'></div>");
        movie_year = getMovieYearMegogo();
        movie_title = getMovieTitleMegogo();
    }

	loadIMDbRating(movie_title, movie_year);
	loadKPRating(movie_title, movie_year);

});

function isMegogo() {
    var href = window.location.href;
    return href.indexOf("://megogo.net/ru/view/") > -1;
}

function isFSTO() {
    var href = window.location.href;
    return href.indexOf("://fs.to/video") > -1 || href.indexOf("://fs.life/video") > -1;
}

function getMovieTitleMegogo() {
    var movie_title = $(".view__title2").html();
    if (!movie_title) {
        movie_title = $(".view__title").html();
    }
    movie_title = movie_title.trim();
    return movie_title;
}

function getMovieYearMegogo() {
    var movie_year = $('#viewInfoYear').text().trim();
    console.info("Movie year", movie_year);
    return movie_year;
}

function getMovieTitleForIMDB() {
	var movie_title = $(".b-tab-item__title-origin").html();
	if (!movie_title) {
		movie_title = $(".b-tab-item__title-inner").find("span[itemprop='name']").html();
	}
	movie_title = movie_title.trim().split("/").clean(undefined).join(" ");
	return movie_title;
}

function getMovieYear() {
	var movie_year = $('.item-info tr').eq(1).find("td").eq(1).text();
	movie_year = movie_year.trim().split(' ')[0];
	movie_year = movie_year.split("–")[0];
	movie_year = movie_year.replace( /^\D+/g, '');
	console.info("Movie year", movie_year);
	return movie_year;
}

Array.prototype.clean = function(deleteValue) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == deleteValue) {
			this.splice(i, 1);
			i--;
		}
	}
	return this;
};


function getCurrentDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){
		dd='0'+dd
	}
	if(mm<10){
		mm='0'+mm
	}

	return dd+'.'+mm+'.'+yyyy;
}