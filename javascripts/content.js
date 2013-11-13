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
    //gets the data
    var data = fromDOM.baseNode.data;
    //gets the source
    var new_source = fromDOM.baseNode.baseURI;
    //figures out the text highlighted



    new_data = data.substr(startNum,endNum);
    //sets the chrome data
    chrome.runtime.sendMessage({method:'setTitle', title: new_data, source: new_source});
  })

    // alert(new_data + "hey")

});


