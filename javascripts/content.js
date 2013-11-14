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
    //anchor = where you mouse down
    // var anchor = fromDOM.anchorOffset;
    //focus = where you mouse up
    // var focus = fromDOM.focusOffset;
    //gets the data. baseNode seems to work best for this.
    // var data = fromDOM.baseNode.data;

    //figures out the text highlighted

    //figuring out which way the mouse highlights from.
    // if(anchor < focus){
    //   var end = focus - anchor;
    //   new_data = data.substr(anchor,end);
    // } else {
    //   var end = anchor - focus;
    //   new_data = data.substr(focus,end);
    // }
  })
});


