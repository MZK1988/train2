// var config = {
//     apiKey: "AIzaSyCagBskWkOB85dUjQo8y_Q1LvTA4iVVnoo",
//     authDomain: "eetimesheet.firebaseapp.com",
//     databaseURL: "https://eetimesheet.firebaseio.com",
//     projectId: "eetimesheet",
//     storageBucket: "",
//     messagingSenderId: "709285101569"
// };
// firebase.initializeApp(config);





$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyDPFE_qsYuH98IMY-6p7Ztcv5dVYOm07zg",
        authDomain: "train-79f49.firebaseapp.com",
        databaseURL: "https://train-79f49.firebaseio.com",
        projectId: "train-79f49",
        storageBucket: "train-79f49.appspot.com",
        messagingSenderId: "189658414433"
    };
    firebase.initializeApp(config);

    var database = firebase.database();


    $("#submitOne").on("click", function () {

        event.preventDefault();


        var trainName = $("#trainName").val()
        var trainDestination = $("#trainDestination").val()
        var firstTime = $("#firstTime").val()
        var frequency = $("#frequency").val()

        var newTrain = {
            name: trainName,
            destination: trainDestination,
            firstTrain: firstTime,
            frequency: frequency
        };

        database.ref().push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrain);
        console.log(newTrain.frequency);




    });

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {
        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var firstTime = childSnapshot.val().firstTrain;
        var frequency = childSnapshot.val().frequency;

        console.log(trainName);
        console.log(trainDestination);
        console.log(firstTime);
        console.log(frequency);

        // 1. Take the minute count of current time
        // 2. Get the remainder by dividing the minute count of current time by frequency
        // 3. Frequency minus the remainder  =  how many minutes away
        // 4. how many minutes away + current time = next stop

        //pushed back 1 year to make sure it comes before current time
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years")

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        //difference bw current time and first time in minutes
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        //Time apart-this divides the difference between current time and first time to get the remainder in minutes..(the frequency) - (the remainder)  = minutes until the next train
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        //This is the the amount of time in minutes until the next train..ie how many minutes away 
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        //This is the time of the next train...add minutes until next train to current time
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



        $("#currentEmployees").append("<tbody><tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain +  "</td></tr></tbody>")

    })

    



});
