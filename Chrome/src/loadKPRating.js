function loadKPRating(movie_title, movie_year) {
    function KPRating(kpID, kpRating,kpVotes) {
        AbstractRating.apply(this, arguments);
    }

    KPRating.prototype = Object.create(AbstractRating.prototype);
    KPRating.prototype.constructor = KPRating;
    KPRating.prototype.getHtmlContent = function () {
        return "<div class=\"rating_kp\"> \
							<div class=\"icon_kp\"></div> \
							<div class=\"info_kp\"> \
								<span class=\"score\"> \
									<span class=\"value\">10.4</span> \
								</span> \
								<span class=\"votes\"> \
									<span class=\"value\">496,762</span>\
								</span> \
							</div> \
						</div>";
    };
    KPRating.prototype.getUri = function () {
        return "http://www.kinopoisk.ru/film/";
    };

    var name = movie_title.split(" ").join(",");
    console.info(name);
    var currentDate = getCurrentDate();

    function render(film) {
        console.info(film);
        var regExp = /\(([^)]+)\)/;
        var rating = film["rating"];
        var res = regExp.exec(rating);
        if (res) {
            var votes = res[1];
            var score = rating.split(" ")[0];

            var kp = new KPRating(film["id"], score, votes);
            $("#KP_Rating").append(kp.render());
        }
    }

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://api.kinopoisk.cf/searchFilms',
        data: { keyword: name, date: currentDate },
        success: function (result) {
            console.info(result);
            var searchFilms = result["searchFilms"];
            if (searchFilms) {
                if (searchFilms.length == 1) {
                    render(searchFilms[0]);
                    return;
                }
                for (var idx in searchFilms) {
                    var film = searchFilms[idx];
                    if (film["rating"] && film["year"] == movie_year) {
                        render(film);
                        break;
                    }
                }
            }
        }
    });
}