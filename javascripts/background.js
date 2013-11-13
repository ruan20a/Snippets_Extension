//setting global variables to fetch what the popup.js needs.
var title = null;
var source = null;

// there are many ways for the background pages to communicate
//this is the code that i found which is most intuitive to understand
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  // make sure to that your sendMessages have methods so chrome can differentiate.
  if(message.method == 'setTitle'){
  //message is sent as a hash, we're grabbing the values in titles and source.
    title = message.title;
    source = message.source;
    }
  else if(message.method == 'getTitle'){
    sendResponse(title);
    }
  console.log(title);
});