var socket = io();

$(function(){

//FINDS USER'S CURRENT FRIENDS
  var minlength = 3;
  $('#getfriends').keyup(function(e){
    e.preventDefault();
    var searchString = $(this).val();

      if (searchString.length >= minlength ) {
          console.log("getting searchString",  searchString);
        $.ajax({
            method: 'GET',
            url: '/json',
            data: { 'friends.name' : searchString }
        }).done(
        //success
        function(response) {

          //searches for users friends
          if( response.friends.length != 0 ) {
            for (var i = 0; i < response.friends.length; i++) {
              console.log(response.friends[i]);
              $('ul').append("<li id=" + response.friends[i].id + ">" + response.friends[i].name + "</li>");
            }

          } //<-- if statement.


          //==========================================
          //APPENDS WITH EVERY KEYUP WHEN FRIENDS.LENGTH == 0
          // if( response.friends.length == 0 ){
          //   console.log('you have no friends');
          //
          //   $('ul').append('<li>No match found. Make more friends</li>');
          //   return false;
          // }
          //==========================================


        },
        //error
        function(err){
          console.log(err);
        });

      };

  });

  //FINDS OR CREATES NEW USER CONVO
  $('li').click(function(e) {
    console.log(e);
    console.log($(this).prop('id'));
    $friendId = $(this).prop('id');

    $.ajax {
      method: GET,
      url: '/json',
      data: { 'id' : $friendId }
    }.done(
      //success
      function(response){
        console.log(response);
        console.log(response.id);
        console.log(response.convo);
        findOrCreateUserConvo(response);
      },
      //error
      function(err){
        console.log(err);
      });


  });

function findOrCreateUserConvo(response) {
  console.log(response);

  for (var i = 0; i < response.convo.length; i++) {
    if (response.convo[i].id == response.convo[i].id + $friendId.parsInt() || $friendId.parsInt() + response.convo[i].id) {
        console.log("freinds convo match!");
    }else {
      $.ajax {
        method: POST,
        url: '/createNewConvo',
        data: { data : response }
      }
    }

} //<--findOrCreateUserConvo



}); //<-- windowonload
