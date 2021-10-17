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

  function send(){
    message = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
    });
    document.getElementById("msg").value = "";
  }

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
    name = message_data['name'];
    message = message_data['message'];
    like = message_data['like'];
    name_width_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
    message_width_tag = "<h4 class='message_h4'>" + message + "</h4>";
    like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLink(this.id)'>";
    span_width_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + like + "</span></button><hr>";
    row = name_width_tag + message_width_tag + like_button + span_width_tag;
    document.getElementById("output").innerHTML += row;
        //end code
  }});});}
  getData();
  
  function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
  }