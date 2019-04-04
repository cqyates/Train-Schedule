
    var config = {
        apiKey: "AIzaSyA_pIUIxprJ5mF1ATWMYX1IVHQOCGJFzwI",
        authDomain: "train-schedule-hw-2c03a.firebaseapp.com",
        databaseURL: "https://train-schedule-hw-2c03a.firebaseio.com",
        projectId: "train-schedule-hw-2c03a",
        storageBucket: "train-schedule-hw-2c03a.appspot.com",
        messagingSenderId: "937985674221"
      };
      firebase.initializeApp(config);

      var database = firebase.database();

      var trainName;
      var destination;
      var frequency = 0;
      var firstTrainTime;


      $("#add-train").on("click", function() {
        event.preventDefault();
        // Storing and retreiving new train data
        name = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrainTime = $("#first-train").val().trim();
        frequency = $("#frequency-input").val().trim();
        // Pushing to database
        database.ref().push({
            name: name,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("form")[0].reset();
    });
    database.ref().on("child_added", function(childSnapshot) {
        var nextArr;
        var minAway;
        // Chang year so first train comes before now
        var firstTrainNew = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
        // Difference between the current and firstTrainTime
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = diffTime % childSnapshot.val().frequency;
        // Minutes until next train
        var minAway = childSnapshot.val().frequency - remainder;
        // Next train time
        var nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");
        $(".new-train").append("<tr><td>" + childSnapshot.val().name +
                "</td><td>" + childSnapshot.val().destination +
                "</td><td>" + childSnapshot.val().frequency +
               "</td><td>" + nextTrain + 
               "</td><td>" + minAway + "</td></tr>");
     
  
            // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
    });
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // Change the HTML to reflect
        $("#name-display").html(snapshot.val().name);
        $("#email-display").html(snapshot.val().email);
        $("#age-display").html(snapshot.val().age);
        $("#comment-display").html(snapshot.val().comment);
    });