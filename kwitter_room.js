var firebaseConfig = {
  apiKey: "AIzaSyDYygSwn1p4dcQDLlnvq2B5F13dC4qJVn8",
  authDomain: "letchat-6b2bb.firebaseapp.com",
  databaseURL: "https://letchat-6b2bb-default-rtdb.firebaseio.com",
  projectId: "letchat-6b2bb",
  storageBucket: "letchat-6b2bb.appspot.com",
  messagingSenderId: "985840391798",
  appId: "1:985840391798:web:2e7e47b417e57861b03157"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function addRoom(){
room_name = document.getElementById("roomname").value;
firebase.database().ref("/").child(room_name).update({
purpose: "adding room name"
});
localStorage.setItem("room_name", room_name);
window.location = "kwitter_page.html";
}

function getData() 
{
firebase.database().ref("/").on('value',
function(snapshot) 
{
document.getElementById("output").innerHTML ="";
snapshot.forEach(function(childSnapshot) {childKey = childSnapshot.key;
Room_names = childKey;
//Start code
console.log("Room Name - " + Room_names);
row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
document.getElementById("output").innerHTML += row;
//End code
});});}
getData();

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function redirectToRoomName(name){
console.log(name);
localStorage.setItem("room_name", name);
window.location = "kwitter_page.html";
}

function logout(){
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location = "index.html";
}