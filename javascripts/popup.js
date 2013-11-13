$( document ).ready(function(){
  var bg = chrome.extension.getBackgroundPage();
  console.log(bg.title)
  $('#testing').text(bg.title)
  }
);