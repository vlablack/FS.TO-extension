function LoadIMDbRating(movie_title, movie_year) {
    function IMDb(imdbID, imdbRating, imdbVotes) {
        var htmlcontent = "<div id='raiting_video'> \
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
        var content = $(htmlcontent);
        var star_widht = imdbRating * 10.2;
        content.find("#score").find("#value").html(imdbRating);
        content.find('#raiting_votes').width(star_widht);
        content.find("#votes").find("#value").html(imdbVotes);
        var result = jQuery("<a target='_blank'></a>").attr("href", "http://www.imdb.com/title/" + imdbID);
        result.append(content);
        console.log(result);
        return result;
    }
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://www.omdbapi.com/',
        data: {
            t: movie_title,
            y: movie_year
        },
        success: function (result) {
            if (!result["Error"]) {

                $("#IMDb_Rating").append(IMDb(result["imdbID"], result["imdbRating"], result["imdbVotes"]));
            }
        }
    });
}