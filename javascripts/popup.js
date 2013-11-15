var Snippet = Snippet || {};

Snippet.login = function(e){
  e.preventDefault();
  //grabbing input fields
  var newUser = {
    email: $('input[name=email]').val(),
    password: $('input[name=password]').val()
  };
  //settings Storage to reference chrome.storage.local;
  var Storage = chrome.storage.local;
  //sending id to chrome storage
  var setChromeStorage = function(user_id){
    Storage.set({
      "user_key": user_id
    });
  }

  var getChromeStorage = function(){
    Storage.get("user_key", function(result){
    if (result.user_key > 0){
      $('#testing-login').addClass('hidden')
      $('input[name=user_id]').val(result.user_key)
      $('a').addClass('hidden')
      // $('#show-snippet').removeClass('hidden')
      $('#post-snippet').removeClass('hidden')
    }
  })
  }

  $.ajax({
    type: "POST",
    url: "http://sn1pp37s.herokuapp.com/login.json",
    crossDomain: true,
    data: newUser,
    dataType: "json",
    error: function(xhr, textStatus, error){
      $('#error').text("Email and password do not match. Please try again")
    }
  }).done(
    function(id){
      setChromeStorage(id)
      console.log(id)
      getChromeStorage();
    }
  )
}

// Snippet.showSnippets = function() {
//   $.ajax({
//     type: "GET",
//     url: "http://localhost:3000/snippets.json",
//     crossDomain: true,
//     dataType: "json"
//   }).done(function(snippets){
//     var $ul = $("<ul>");
//     $.each(snippets, function(index, snippet){
//       $snippet = $("<li>")
//         .text(snippet.body)
//         .appendTo($ul);
//     })
//     $ul.appendTo($('#all-snippets'))
//   });
//    $('#show-snippet').off("click", Snippet.showSnippets)
// }

Snippet.addSnippets = function(e){
  e.preventDefault();
    var newSnippet = {
      body: $('textarea[name=body]').val(),
      source: $('input[name=source]').val(),
      user_id: $('input[name=user_id]').val(),
      notes: $('textarea[name=notes]').val(),
      tag_list: $('textarea[name=tag_list]').val()
    };

    $.ajax({
      type: "POST",
      url: "http://sn1pp37s.herokuapp.com/snippets.json",
      dataType: "json",
      crossDomain: true,
      data: {snippet: newSnippet}
    }).done(
      $('#message').text("Snippet Saved!")
      )
    if ($('#message').text() === "Snippet Saved!")
      {setTimeout(function(){window.close()},1100)
    }
}

Snippet.deleteSnippets = function(e){
  e.preventDefault();
  var $target = $(e.target).parent();
  var snippet_id = $target.attr('id')
      $.ajax({
      type: "DELETE",
      url: "/snippets/"+ snippet_id,
      dataType: "json"
    })
}

$( document ).ready(function(){
  var Storage = chrome.storage.local;
  // Storage.remove("user_key")
  //checks out if you have a key already set! if not you will only see the signup form
  Storage.get("user_key", function(result){
    if (result.user_key > 0){
      $('#testing-login').addClass('hidden')
      $('a').addClass('hidden')
      $('input[name=user_id]').val(result.user_key)
      // $('#show-snippet').removeClass('hidden')
      $('#post-snippet').removeClass('hidden')
    }
  })
  // Storage.remove("user_key")
  $('#login-form').on("submit", Snippet.login)
  // $('#show-snippet').on("click", Snippet.showSnippets)
  $('#post-snippet').on("submit", Snippet.addSnippets)
  //reseting the values so it doesnt automatically take the last updated value
  $('textarea[name=body]').val("")
  $('input[name=source]').val("")
  //calling for my background page
  var bg = chrome.extension.getBackgroundPage();
  $('textarea[name=body]').val(bg.title)
  $('input[name=source]').val(bg.source)

  //TODO trying to fix the popup position.
  // var w = 600;
  // var h = 100;
  // var left = (window.screen.width/2)-(w/2);
  // var top = (window.screen.height/2)-(h/2);

  // var win = window.open("example.html", "_blank", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h);
  // win.moveTo(left, top);
  }
);