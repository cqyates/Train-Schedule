

    //initialize firebase
    var config = {
        apiKey: "AIzaSyD9NkcqUfr1uS6oAUYba8RKvUOJ5POJx88",
        authDomain: "first-project-d1d3a.firebaseapp.com",
        databaseURL: "https://first-project-d1d3a.firebaseio.com",
        projectId: "first-project-d1d3a",
        storageBucket: "first-project-d1d3a.appspot.com",
        messagingSenderId: "621902807967"
    };
    firebase.initializeApp(config);
    
    //2. create an on-click event for the submit button (example in employee-data)
    $('#add-train').on("click", function(event) {
        event.preventDefault();
    
        trainName = $("#name-input").val().trim();
        destination =  $("#destination-input").val().trim();
        firstTrain =  $("#first-train").val().trim();
        frequency =  $("#frequency-input").val().trim();
    
        //ADD DATA TO FIREBASE
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
          });
        


    
    });

    var tFrequency = $("#frequency-input").val().trim();

    // Time is 3:30 AM
    var firstTime = $("#frequency-input").val().trim();

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    //todo-list
    //fix firebase link
    