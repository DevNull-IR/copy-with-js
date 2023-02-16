function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    var status = successful ? true : false;
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    document.body.removeChild(textArea);
    console.error('Fallback: Oops, unable to copy', err);
    return false;
  }

  document.body.removeChild(textArea);
  return status;
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text);
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
    return true;
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
    return false;
  });
}
function copy(text){
  return copyTextToClipboard(text);
}
