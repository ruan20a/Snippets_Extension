// alert("HELLO!");

$(document).ready(function(){
    var new_data = null;
  $(document).on("mouseup",function(e){
    console.log(window.getSelection());
    console.log(e);

    var fromDOM = window.getSelection();

    //startNum and endNum figures out the text
    var startNum = fromDOM.baseOffset;
    var endNum = fromDOM.extentOffset - startNum;
    var data = fromDOM.baseNode.data;
    new_data = data.substr(startNum,endNum);
    // alert(new_data)
    chrome.runtime.sendMessage({method:'setTitle', title: new_data});
  })

    // alert(new_data + "hey")

});


