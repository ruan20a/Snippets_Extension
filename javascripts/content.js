// alert("HELLO!");

$(document).ready(function(){
    var new_data = null;
  $(document).on("mouseup",function(e){

    //TODO testing for links!! please don't delete
    console.log(window.getSelection());
    console.log(e);
    //TODO need to differentiate between text and links
    var fromDOM = window.getSelection();
    //anchor = where you mouse down
    var anchor = fromDOM.anchorOffset;
    //focus = where you mouse up
    var focus = fromDOM.focusOffset;
    //gets the data. baseNode seems to work best for this.
    var data = fromDOM.baseNode.data;
    //gets the source
    var new_source = fromDOM.baseNode.baseURI;
    //figures out the text highlighted

    //figuring out which way the mouse highlights from.
    if(anchor < focus){
      var end = focus - anchor;
      new_data = data.substr(anchor,end);
    } else {
      var end = anchor - focus;
      new_data = data.substr(focus,end);
    }

    // testing_alert
    // alert(new_data)

    //sets the chrome data
    chrome.runtime.sendMessage({method:'setTitle', title: new_data, source: new_source});
  })

    // alert(new_data + "hey")

});


