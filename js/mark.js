function mark(id, mark, onSuccess, data) {
  var url = "./" + id + "/" + mark;
  if( data ) { 
    url += "/" + data
  }
  
  new ProtoJS.Ajax().fetch(url, handleMarkAnswer(onSuccess));
}

function handleMarkAnswer(handler) {
  return function(xmlhttp) {
    if( xmlhttp.readyState == 4 ) {
      var answer = eval( '(' + xmlhttp.responseText + ')' );
      if(answer.result == "ok" ) {
        handler(answer.data);
      } else {
        alert(answer.error);
      }
    }
  }
}

// FAVORITES

function toggleFavorite(diagram) { 
  mark( diagram, "favorite", setFavorite ); 
}

function setFavorite(marks) {
  var favorite  = document.getElementById("favorite-"  + marks.id);
  if( favorite ) {
    favorite.src = "http://static.thesoftwarefactory.be/images/icons/star" +
                   ( marks.favorite ? "" : "-empty" ) + ".png";
  }
}

// TAGS

function addTag(diagram) {
  var tag = document.getElementById( "tag2add" ).value;
  mark( diagram, "tag", setTags, tag );
  stopAddTag();
}

function removeTag(diagram, tag) {
  mark( diagram, "untag", setTags, tag );
}

function setTags(data) {
  diagram = data.diagram;
  tags    = data.tags;
  
  tagHTML = '';
  if( tags.isArray() ) {
    tags.iterate( function(tag) {
      tagHTML += '\
        <table id="tag">          \
          <tr class="border">       \
            <td class="corner"></td>  \
            <td></td>';
      if( canChangeTags ) {
        tagHTML += '\
            <td></td><td></td>';
      }
      tagHTML += '\
            <td class="corner"></td>  \
          </tr>       \
          <tr>        \
            <td></td>   \
            <td class="label">' + tag + '</td>';
      if( canChangeTags ) {
        tagHTML += '\
            <td class="spacer"></td> \
            <td class="close"> \
              <span onclick="removeTag(\'' +diagram+ '\', \'' +tag+ '\');">X</span> \
            </td>';
      }
      tagHTML += '\
            <td></td>   \
          </tr>       \
          <tr class="border">         \
            <td class="corner"></td>    \
            <td></td>';
      if( canChangeTags ) {
        tagHTML += '\
            <td></td><td></td>';
      }
      tagHTML += '\
            <td class="corner"></td>    \
          </tr>         \
        </table>      \
      ';
    } );
  }
  document.getElementById('tags').innerHTML = tagHTML;
}

function startAddTag() {
  document.getElementById("addTagAction").style.display = "none";
  document.getElementById("addTag").style.display = "inline";
  document.getElementById("tag2add").focus();
}

function stopAddTag() {
  document.getElementById("addTagAction").style.display = "inline";
  document.getElementById("addTag").style.display = "none";
  document.getElementById("tag2add").value = "";
}
