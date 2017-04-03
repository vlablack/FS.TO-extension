function loadIMDbRating(movie_title, movie_year) {
    function IMDbRating(imdbID, imdbRating, imdbVotes) {
		AbstractRating.apply(this, arguments);
    }

	IMDbRating.prototype = Object.create(AbstractRating.prototype);
	IMDbRating.prototype.constructor = IMDbRating;

	IMDbRating.prototype.getHtmlContent = function () {
		return "<div id='raiting_video'> \
						<div> \
							<div id='icon_imdb'></div> \
							<div id='info_imdb'> \
								<div id='score'> \
									<div id='score_icon'></div> \
									<div id='value'>8.4</div> \
								</div> \
								<div id='votes'> \
									<div id='score_icon'></div> \
									<div id='value'>496,762</div> \
								</div> \
							</div> \
						</div> \
						<div id='raiting'> \
							<div id='raiting_blank'></div> \
							<div id='raiting_votes'></div> \
						</div> \
					</div>";
	};
	IMDbRating.prototype.getUri = function () {
		return "http://www.imdb.com/title/";
	};
	IMDbRating.prototype.beforeRender = function (content) {
		console.log("Rating: " + this.Rating);
		var star_width = this.Rating * 107 / 10;
		content.find('#raiting_votes').width(star_width);
	};

	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: 'http://www.omdbapi.com/',
		data: {
			t: movie_title,
			y: movie_year
		},
		success: function (result) {
			console.info(result);
			if (!result["Error"]) {
				var imdb = new IMDbRating(result["imdbID"], result["imdbRating"], result["imdbVotes"]);
				$("#IMDb_Rating").append(imdb.render());
				console.log(result["Poster"]);
				$("a.images-show img").attr('src', result["Poster"]);
			}
		}
	});
}