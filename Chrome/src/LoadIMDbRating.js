function loadIMDbRating(movie_title, movie_year) {
    function IMDbRating(imdbID, imdbRating, imdbVotes) {
		AbstractRating.apply(this, arguments);
    }

	IMDbRating.prototype = Object.create(AbstractRating.prototype);
	IMDbRating.prototype.constructor = IMDbRating;

	IMDbRating.prototype.getHtmlContent = function () {
		return "<div class='raiting_video'> \
						<div> \
							<div class='icon_imdb'></div> \
							<div class='info_imdb'> \
								<div class='score'> \
									<div class='score_icon'></div> \
									<div class='value'>8.4</div> \
								</div> \
								<div class='votes'> \
									<div class='score_icon'></div> \
									<div class='value'>496,762</div> \
								</div> \
							</div> \
						</div> \
						<div class='raiting'> \
							<div class='raiting_blank'></div> \
							<div class='raiting_votes'></div> \
						</div> \
					</div>";
	};
	IMDbRating.prototype.getUri = function () {
		return "http://www.imdb.com/title/";
	};
	IMDbRating.prototype.beforeRender = function (content) {
		var star_width = this.Rating * 107 / 10;
		content.find('.raiting_votes').width(star_width);
	};

	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: 'http://www.omdbapi.com/',
		data: {
			t: movie_title,
			y: movie_year
		},
        beforeSend: function(jqXHR, settings) {
            console.log(settings.url);
        },
		success: function (result) {
			console.info(result);
			if (!result["Error"]) {
				var imdb = new IMDbRating(result["imdbID"], result["imdbRating"], result["imdbVotes"]);
				$("#IMDb_Rating").append(imdb.render());
				$("a.images-show img").attr('src', result["Poster"]);
			}
		}
	});
}