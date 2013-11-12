
var title;

// there are many ways for the background pages to communicate
//this is the code that i found which is most intuitive to understand
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  // make sure to that your sendMessages have methods so chrome can differentiate.
  if(message.method == 'setTitle'){
    title = message.title;
    }
  else if(message.method == 'getTitle'){
    sendResponse(title);
    }
});
