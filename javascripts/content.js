// alert("HELLO!");

$(document).ready(function(){
  $(document).on("mouseup",function(e){
    //finds what you highlighted
    var fromDOM = window.getSelection();
    //changes it to string for text
    var new_data = fromDOM.toString();
    //gets the source
    var new_source = fromDOM.baseNode.baseURI;
    //sets the chrome data
    chrome.runtime.sendMessage({method:'setTitle', title: new_data, source: new_source});
  })
});


