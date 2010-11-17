  function mark(id, marking, onSuccess) {
    var url = "./" + id + "/" + marking;
    new ProtoJS.Ajax().fetch(url, onSuccess);
  }

  function setMarks(marks) {
    var favorite  = document.getElementById("favorite-"  + marks.id);
    if( favorite ) {
      favorite.src = 
        "http://static.thesoftwarefactory.be/images/icons/star" +
        ( marks.favorite ? "" : "-empty" ) + ".png";
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

  function toggleFavorite(id) { mark( id, "favorite", handleMarkAnswer ); }

