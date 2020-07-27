
// https://api.themoviedb.org/3/movie/550?api_key=e887da77e61cb551591cb5cd06107a79 MY API


// Milestone 1:Creare un layout base con una searchbar (una input e un button) in cui possiamoscrivere completamente o parzialmente il nome di un film. Possiamo, cliccando ilbottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ognifilm trovato:1.Titolo2.Titolo Originale3.Lingua4.Voto


function searchBtnListener() {
  var btn = $("#search-btn");
  btn.click(searchRequest);
}

function searchRequest() {
  var searchVal = $("#search").val();
  $(".titles").text("");
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d&query=' + searchVal + '&language=it',
    method: "GET",
    success: function (data) {
      var results = data["results"];
      var template = $("#searched-movie-template").html();
      var compiled = Handlebars.compile(template);
      var target = $(".titles");
      for (var i = 0; i < results.length; i++) {
        var targetHTML = compiled({
        "it-title": results[i].title,
        "original_title": results[i].original_title,
        "original_language": results[i].original_language,
        "vote_average": results[i].vote_average
      })
      target.append(targetHTML);
    }
    },
    error: function (error) {
      console.log(error);
    }
  })
}


function init() {
searchBtnListener();
}

$(document).ready(init);
