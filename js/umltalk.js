  function mark(id, marking, onSuccess) {
    var url = "posts/" + id + "/" + marking;
    new ProtoJS.Ajax().fetch(url, onSuccess);
  }

  function setMarks(marks) {
    var voteUp    = document.getElementById("voteUp-"    + marks.id);
    var voteDown  = document.getElementById("voteDown-"  + marks.id);
    var votes     = document.getElementById("votes-"     + marks.id);
    var favorite  = document.getElementById("favorite-"  + marks.id);
    var favorites = document.getElementById("favorites-" + marks.id);
    
    if(voteUp) { 
      voteUp.src = 
        "http://static.thesoftwarefactory.be/images/icons/thumb-up" +
        ( marks.voteUp ? "" : "-grey" ) + ".png";
    }
    
    if( voteDown ) {
      voteDown.src =
        "http://static.thesoftwarefactory.be/images/icons/thumb" +
        ( marks.voteDown ? "" : "-grey" ) + ".png";
    }
      
    if( votes ) {
      votes.innerHTML = marks.votes;
    }

    if( favorite ) {
      favorite.src = 
        "http://static.thesoftwarefactory.be/images/icons/star" +
        ( marks.favorite ? "" : "-empty" ) + ".png";
    }

    if( favorites ) {
      favorites.innerHTML = marks.favorites;
    }
  }

  function handleMarkAnswer(xmlhttp) {
    if( xmlhttp.readyState == 4 ) {
      var answer = eval( '(' + xmlhttp.responseText + ')' );
      if(answer.result == "ok" ) {
        setMarks(answer);
      } else {
        alert( answer.error );
      }
    }
  }

  function voteUp(id)         { mark( id, "up",       handleMarkAnswer ); }
  function voteDown(id)       { mark( id, "down",     handleMarkAnswer ); }  
  function toggleFavorite(id) { mark( id, "favorite", handleMarkAnswer ); }

