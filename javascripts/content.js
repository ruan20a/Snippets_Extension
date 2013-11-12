// alert("HELLO!");

$(document).ready(function(){
    var new_data = $('h1').text();
  $(document).on("mouseup",function(e){
    var fromDOM = window.getSelection();
    var startNum = fromDOM.baseOffset;
    var endNum = fromDOM.extentOffset - startNum;
    var data = fromDOM.baseNode.data;
    var new_data = data.substr(startNum,endNum);
    chrome.runtime.sendMessage({method:'setTitle', title:new_data});
  })

});


