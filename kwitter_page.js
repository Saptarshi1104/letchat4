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

  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("rrom_name");

  function getData() 
  { 
    firebase.database().ref("/"+room_name).on('value', function(snapshot) 
    { document.getElementById("output").innerHTML = ""; 
    snapshot.forEach(function(childSnapshot) 
    { childKey  = childSnapshot.key; 
      childData = childSnapshot.val(); 
      if(childKey != "purpose") 
      {
    firebase_message_id = childKey;
    message_data = childData;
    //start code
    console.log(firebase_message_id);
    console.log(message_data);
    Name = message_data['Name'];
    Message = message_data['Message'];
    like = message_data['likes'];
    name_with_tag = "<h4>" + Name + "<img class='user_tick' src='tick.png'></h4>";
    message_with_tag = "<h4 class='message_h4'>" + Message + "</h4>";
    like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
    span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>&nbsp; Like: " + like + "</span></button><hr>";
    row = name_with_tag + message_with_tag + like_button + span_with_tag;
    document.getElementById("output").innerHTML += row;
        //end code
  }});});}
  getData();

  function send(){
    Message = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
    });
    document.getElementById("msg").value = "";
    console.log(Message);
  }
  
  function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
  }

  function updateLike(message_id){
  console.log("Clicked on like button- " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);
  firebase.database().ref(room_name).child(message_id).update({
  like: updated_likes
  });
  }