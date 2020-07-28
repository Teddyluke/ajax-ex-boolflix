
// https://api.themoviedb.org/3/movie/550?api_key=e887da77e61cb551591cb5cd06107a79 MY API


// Milestone 1:Creare un layout base con una searchbar (una input e un button) in cui possiamoscrivere completamente o parzialmente il nome di un film. Possiamo, cliccando ilbottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ognifilm trovato:1.Titolo2.Titolo Originale3.Lingua4.Voto


function searchBtnListener() {
  var btn = $("#search-btn");
  btn.click(searchRequest);
}

function searchRequest() {
  var searchVal = $("#search").val();
  $(".titles").text("");
  $("#search").val("");
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie',
    method: "GET",
    data: {
      'api_key':'e99307154c6dfb0b4750f6603256716d',
      'query' : searchVal,
      'language' : 'it'
    },
    success: function (data) {
      var results = data["results"];
      var template = $("#searched-movie-template").html();
      var compiled = Handlebars.compile(template);
      var target = $(".titles");
      for (var i = 0; i < results.length; i++) {
        var targetHTML = compiled(results[i])
        target.append(targetHTML);
        var vote = results[i]['vote_average'];
        getStarsRating(vote)
    }
    },
    error: function (error) {
      console.log(error);
    }
  })
}

function getStarsRating(vote){
  var starsRating = Math.ceil(vote / 2);
  var template = $("#star-rating").html();
  var compiled = Handlebars.compile(template);
  var target = $(".titles");
  var targetHTML;
  for (var i = 0; i < 5; i++) {
    if(i<vote){
      targetHTML = compiled({
        "stellapiena": "<i class='fa fa-star'></i>",
      });
    }else{
      targetHTML = compiled({
        "stellavuota": "<i class='far fa-star'></i>"
      });
    }
    target.append(targetHTML);
  }
}


function init() {
searchBtnListener();
}

$(document).ready(init);
