var Snippet = Snippet || {};

Snippet.login = function(e){
  e.preventDefault();
  //grabbing input fields
  var newUser = {
    email: $('input[name=email]').val(),
    password: $('input[name=password]').val()
  };
  //sending id to chrome storage
  var setChromeStorage = function(user_id){
    Storage.set({
      "user_key": user_id
    })
  };

  // sending email and password to chrome storage
  var setChromeStorage2 = function(newUser){
    Storage.set({
      "email": newUser.email,
      "password": newUser.password
    })
  };

  setChromeStorage2(newUser);

  var getChromeStorage = function(){
    Storage.get("user_key", function(result){
      if (result.user_key > 0){
        $('#testing-login').addClass('hidden');
        $('input[name=user_id]').val(result.user_key);
        $('a').addClass('hidden');
        $('#post-snippet').removeClass('hidden');
      };
    })
  };

  $.ajax({
    type: "POST",
    url: "http://sn1pp37s.herokuapp.com/login.json",
    crossDomain: true,
    data: newUser,
    dataType: "json",
    error: function(xhr, textStatus, error){
      $('#error').text("Email and password do not match. Please try again");
    }
  }).done(
    function(id){
      setChromeStorage(id)
      console.log(id)
      getChromeStorage();
    }
  )

}

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
      function(result){
        if(result.user_id > 0){
          $('#message').text("Snippet Saved!");
        }
        else{
          $('#message').text("We could not save your snippet =(");
        }
      }
    );


    if ($('#message').text() === "Snippet Saved!")
      e.preventDefault();
    {
      setTimeout(function(){window.close();},1500);
    }

}

Snippet.redirectPage = function(e){
  e.preventDefault();
  var Storage = chrome.storage.local;
  var user_id;
  var email;
  var password;
  //due to asynchronous callback function of the local Storage, I am setting the variables and executing the ajax calls within the function
  Storage.get(["user_key","email","password"], function(result){
    user_id = result.user_key;
    redirect_url = "http://sn1pp37s.herokuapp.com/users/" + user_id;

    var newUser = {
      email: result.email,
      password: result.password
    }

    // need to set sessions so I will do a get request for the login page and simulate the log in
    $.ajax({
      url: "http://sn1pp37s.herokuapp.com/login",
      type: "GET",
      dataType:"html",
      success: function(){
        $.ajax({
          type: "POST",
          url: "http://sn1pp37s.herokuapp.com/login",
          dataType: "json",
          crossDomain: true,
          data: newUser,
          success:
          //cannot set this as an anonymous function, it needs to be called immediately after success.
            window.open(redirect_url,"_blank")
          });
      }
    })


  });
}

$( document ).ready(function(){
  var Storage = chrome.storage.local;
  // Storage.remove("user_key")
  //checks out if you have a key already set! if not you will only see the signup form
  Storage.get("user_key", function(result){
    if (result.user_key > 0){
      $('#testing-login').addClass('hidden');
      $('a').addClass('hidden');
      $('input[name=user_id]').val(result.user_key);
      // $('#show-snippet').removeClass('hidden')
      $('#post-snippet').removeClass('hidden');
    }
  })
  // Storage.remove("user_key")
  $('#login-form').on("submit", Snippet.login);
  // $('#show-snippet').on("click", Snippet.showSnippets)
  $('#post-snippet').on("submit", Snippet.addSnippets);
  //reseting the values so it doesnt automatically take the last updated value
  $('textarea[name=body]').val("");
  $('input[name=source]').val("");
  //linking the wallace name to your user profile
  $('#user-profile-link').on("click", Snippet.redirectPage);
  //calling for my background page
  var bg = chrome.extension.getBackgroundPage();
  $('textarea[name=body]').val(bg.title);
  $('input[name=source]').val(bg.source);
  }
);