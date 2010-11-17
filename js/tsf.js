var Browser = {
    IE:     !!(window.attachEvent &&
      navigator.userAgent.indexOf('Opera') === -1),
    Opera:  navigator.userAgent.indexOf('Opera') > -1,
    Chrome: navigator.userAgent.indexOf('Chrome') > -1,
    Safari: navigator.userAgent.indexOf('Safari') > -1 &&
      navigator.userAgent.indexOf('Chrome') === -1,
    WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
    Gecko:  navigator.userAgent.indexOf('Gecko') > -1 &&
      navigator.userAgent.indexOf('KHTML') === -1,
    MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/)
};

function openInPopup(page, width, height) {
  var popup = window.open( page,'popup',
                           'height=' + height + ',width=' + width +
                           ',toolbar=no,directories=no,status=no,menubar=no' +
                           ',scrollbars=no,resizable=no');
  height += 30;
  if( Browser.IE )     { height += 70; }
  if( Browser.Opera )  { height += 20; }
  if( Browser.Chrome ) { height += 50; }
  if( Browser.Gecko )  { height += 50; }
  popup.resizeTo(width, height);
}

function setValidationResult(obj, result, msg, retval) {
  var feedback = document.getElementById(obj.id + "Feedback");
  obj.className      = result;
  feedback.className = result;
  feedback.innerHTML = msg;
  return retval;
}

function markInvalid(obj, msg) {
  return setValidationResult(obj, "invalid", msg, false );
}

function markValid(obj) {
  return setValidationResult(obj, "valid", "OK", true );
}

function resetValidation(obj) {
  setValidationResult(obj, "", "", true );
}

function validateAtServer(obj) {
  obj.className = "validating";
  new ProtoJS.Ajax()
    .fetch( "ajax/validate.php?obj=" + obj.name + "&value=" + obj.value,
      function(xmlhttp) {
        if( xmlhttp.readyState == 4 ) {
          if( xmlhttp.status == "200" ) {
            var result = xmlhttp.responseText.trim();
            if( result == obj.value ) {
              markInvalid(obj, "not available." );
            } else {
              markValid(obj);
            }
          } else {
            markInvalid(obj, "unable to verify at the server." );            
          }
        }
      } );
  return true;
}

function validateObj(label, obj, charset, charsetMsg, min, max, server) {
  resetValidation(obj);
 
  var p = new RegExp(charset);
  if( !p.test(obj.value) ) {
    return markInvalid(obj, label + " " + charsetMsg );
  } else if( min > 0 && obj.value.length < min ) {
    return markInvalid(obj, "minimal " + label + " length: " + min );
  } else if( min < 0 && obj.value.length != 0 && obj.value.length < Math.abs(min) ) {
    return markInvalid(obj, "minimal " + label + " length: " + Math.abs(min) + " or empty" );
  } else if( obj.value.length > max ) {
    return markInvalid(obj, "maximal " + label + " length: " + max );
  } else {
    if( server && obj.value.length > 0 ) {
       return validateAtServer(obj);  
    }
    return markValid(obj);
  }
}

function hasClass(ele,cls) {
  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
  if( !this.hasClass(ele,cls) ) { ele.className += " " + cls };
}

function removeClass(ele,cls) {
  if( hasClass(ele,cls) ) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}

