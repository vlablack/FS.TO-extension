function LoadKPRating(movie_title, movie_year) {
    function KP(kpID, kpRating,kpVotes) {
        var htmlcontent = "<div id=\"rating_kp\"> \
							<div id=\"icon_kp\"></div> \
							<div id=\"info_kp\"> \
								<span id=\"score\"> \
									10.4 \
								</span> \
								<span id=\"votes\"> \
									496,762\
								</span> \
							</div> \
						</div>";
        var content = $(htmlcontent);
        content.find("#score").html(kpRating);
        content.find("#votes").html("(" + kpVotes + ")");
        var result = jQuery("<a target='_blank'></a>").attr("href", "http://www.kinopoisk.ru/film/" + kpID);
        result.append(content);
        console.log(result);
        return result;
    }

    var name = movie_title.split(" ").join(",");
    var currentDate = CurrentDate();

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://api.kinopoisk.cf/searchFilms',
        data: { keyword: name, date: currentDate },
        success: function (result) {
            console.log(result);
            var searchFilms = result["searchFilms"];
            if (searchFilms) {
                for (var idx in searchFilms) {
                    var film = searchFilms[idx];
                    if (film["rating"] && film["year"] == movie_year) {
                        console.log(film);
                        var regExp = /\(([^)]+)\)/;
                        var rating = film["rating"];
                        var res = regExp.exec(rating);
                        if (res) {
                            var votes = res[1];
                            var score = rating.split(" ")[0];

                            $("#KP_Rating").append(KP(film["id"], score, votes));
                            console.log("pampam");
                        }
                        break;
                    }
                }
            }
        }
    });
}

function CurrentDate() {
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
    var date = dd+'.'+mm+'.'+yyyy;
    return date;
}