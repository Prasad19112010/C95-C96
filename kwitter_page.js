var firebaseConfig = {
    apiKey: "AIzaSyBSHZMV48T5T1uI3OE4j0sDYzUvzJztgio",
    authDomain: "c93-hw.firebaseapp.com",
    databaseURL: "https://c93-hw-default-rtdb.firebaseio.com",
    projectId: "c93-hw",
    storageBucket: "c93-hw.appspot.com",
    messagingSenderId: "141065403553",
    appId: "1:141065403553:web:136e7de6d1e188062fc4e0",
    measurementId: "G-3G3QZR8L44"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");
  function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
      document.getElementById("msg").value = "";
}
  function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData; 
  console.log(firebase_message_id);
  console.log(message_data);
  name = message_data['name'];
  message = message_data['message'];
  like = message_data['like'];
  name_width_tag = "<h4> " + name + "<img src='tick.png' class='user_tick'></h4>";
  message_width_tag = "<h4 class='message_h4'>" + message + "</h4>";
  like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
  span_width_tag = "<span class='glyphicon glyphicon-thumbs-up'>Likes : " + like + "</span></button><br>";
  row = name_width_tag + message_width_tag + like_button + span_width_tag;
  document.getElementById("output").innerHTML += row;
      } });  }); }
getData();
function updateLike(message_id) {
      console.log("Clicked on Like Button " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
