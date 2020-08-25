

// funzione che intercetta il click del bottone
function searchbarListener() {
  var searchbtn = $("#searchbtn");
  searchbtn.click(startSearch)
}

// funzione che intercetta il keyup nell'input
function keyupInput() {
   var inputCerca = $("#searchbar");
   inputCerca.keyup(sendKeyupInput);
 }
// funzione che lancia la ricerca all'enter
 function sendKeyupInput(event) {
   var tasto = event.which;
   var input = $ (this).val();
   if (tasto == 13 && input.length > 0) {
     startSearch();
   }
 }

function startSearch() {

  var searchbar = $("#searchbar");
  var searchValue = $("#searchbar").val();
  searchbar.val("");

  var target = $(".titoli");
  target.text("");

  getData(searchValue, 'movie');
  getData(searchValue, 'tv');

}


 function getData(searchValue, type) {

   $.ajax({
     url:'https://api.themoviedb.org/3/search/'+ type,
     method: "GET",
     data: {
       'api_key':'e99307154c6dfb0b4750f6603256716d',
       'query' : searchValue,
       'language' : 'it'
     },
     success: function (data) {

       var movies = data['results'];


       for (var i = 0; i < movies.length; i++) {

         var movie = movies[i];

         movie.type = type;
         movie.equalTitle = getTitleEqualOriginalTitle(type,movie);

         var vote = movie['vote_average'];
         movie.stars = voteInStar(vote);

         var lang = movie['original_language'];
         movie.flag = flags(lang);

         var poster = movie['poster_path'];

         var overview = movie['overview'];
         movie.overview = overviewShortage(overview);

         printWCast(type, movie);

       }
     },
     error: function (error) {

     }
   });
 }

// funzione per stampare anche il cast, salvandoci dall'asincronicità
function printWCast(type, movie) {

  var id = movie['id'];
  $.ajax({
    url:'https://api.themoviedb.org/3/'+ type +'/'+ id +'/credits',
    method: "GET",
    data: {
      'api_key':'e99307154c6dfb0b4750f6603256716d',
    },
    success: function (data) {
      var cast = data['cast']
      var actors = ' ';
      for (var i = 0; i < 5; i++) {
        var actor = cast[i];
        actors += actor['name'] + ', ';
      }

      movie.actors = actors

      // Handlebars
      var target = $(".titoli");
      var template = $("#film-template").html();
      var compiled = Handlebars.compile(template);
      // Handlebars

      var movieHTML = compiled(movie);
      target.append(movieHTML);
    },
    error: function (error) {

    }

  });
}
// funzione che trasforma il voto da base 10 a 5 e assegna le stelline
function voteInStar(vote) {
  var numberOfStars = Math.ceil(vote / 2);
  var voteInStar = " ";

  for (var i = 0; i < 5; i++) {
    if (i < numberOfStars) {
      voteInStar += '<i class="fas fa-star"></i>';
    } else {
      voteInStar += '<i class="far fa-star"></i>';
    }
  }
  return voteInStar
}

// funzione per ridurre l overview se troppo lungo
function overviewShortage(overview) {
  if (overview.length > 350) {
    return overview.substring(0, 350) + '...'
  } else {
    return overview
  }
}

// funzione per le bandierine
function flags(lang) {
  var flag = " ";
  if (lang == "en") {
    flag = '<img src="https://www.countryflags.io/gb/shiny/32.png">'
  } else if (lang == "it") {
    flag = '<img src="https://www.countryflags.io/it/shiny/32.png">'
  } else {
    flag = lang;
  }
  return flag
}

// funzione che elimina origin title se uguale a titolo
function getTitleEqualOriginalTitle(type, movie) {

  if (type == 'movie') {
      return (movie.title == movie.original_title);
  }
  return ( movie.name == movie.original_name);
}

function init() {
  searchbarListener();
  keyupInput()
}


$(document).ready(init)
