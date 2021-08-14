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

  function addRoom() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
      purpose: "adding room name"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";
  }
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("room_name - " + Room_names)
      row = "<div class='room_name' id="+ Room_names +" onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div> <hr>";
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}
function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}