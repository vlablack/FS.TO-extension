/**
 * Created by Влад on 22.07.2016.
 */
function AbstractRating(id, rating, votes) {
    this.imdbID = id;
    this.Rating = rating;
    this.Votes = votes;

    this.render = function () {
        var content = $(this.getHtmlContent());
        content.find(".score .value").html(this.Rating);
        content.find(".votes .value").html(this.Votes);

        var result = jQuery("<a target='_blank'></a>").attr("href", this.getUri() + this.imdbID);
        result.append(content);
        this.beforeRender(result);
        return result;
    }
}

/**
 * Abstract method for HTML rating content
 */
AbstractRating.prototype.getHtmlContent = function () { };

AbstractRating.prototype.getUri = function () { };

AbstractRating.prototype.beforeRender = function (content) { };