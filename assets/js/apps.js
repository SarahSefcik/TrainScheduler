
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBo-L0aIRVI2OpvUiAxmnpCbE1NxJun2mw",
  authDomain: "trainschedule-debd2.firebaseapp.com",
  databaseURL: "https://trainschedule-debd2.firebaseio.com",
  projectId: "trainschedule-debd2",
  storageBucket: "trainschedule-debd2.appspot.com",
  messagingSenderId: "881360416845"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Trains
$("#download-button").on("click", function (event) {
  event.preventDefault();

  // grabs user input
  // Cant figure out why the input is not going into Firebase
  var trainName = document.getElementById("name").value;
  console.log(trainName);
  var dest = document.getElementById("dest").value;
  console.log(dest);
  var trainTime = document.getElementById("trainTime").value;
  console.log(trainTime);
  var freq = document.getElementById("freq").value;
  console.log(freq);
  
  // Creates local temporary object for holding train data
  var newTrain = {
    name: trainName,
    destination: dest,
    time: trainTime,
    frequency: freq,
  }

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to the console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text boxes
  $("#name").val("");
  $("#dest").val("");
  $("#trainTime").val("");
  $("#freq").val("");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a var
  var dest = childSnapshot.val().destination;
  var trainName = childSnapshot.val().name;
  var trainTime = childSnapshot.val().time;
  var freq = childSnapshot.val().frequency;

  // Train Info
  console.log(dest);
  console.log(trainName);
  console.log(trainTime);
  console.log(freq);

  // Calculate here
  // Make my calculations that I cannot figure out to calculate time



  // Create new row
  var newRow = $("<tr>").append(
    $("<td>").text(dest),
    $("<td>").text(trainName),
    $("<td>").text(trainTime),
    // Add column to here with calculated time to the table row
    $("<td>"),
    $("<td>").text(freq),
    // Add column here with calculated time to the table row
    $("<td>")
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

