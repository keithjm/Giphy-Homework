
//Nothing is done until the page is completly loaded
$(document).ready(function() {

    var topics = ["the office", "homeland", "parks and recreation", "black mirror"];

    //When the website is initially loaded or refreshed, the topics array is traveresed and corresponsing buttons are created. 
    for(var i = 0; i < topics.length; i++) {
        var showButton = $("<button>").text(topics[i]).attr("class", "btn btn-default show-btn").attr("data-name", topics[i]);
        showButton.attr("type", "button");
        $("#buttons").append(showButton);
    }

    //When a show button is clicked, the app will connect to the Giphy API and "GET" the array of gifs 
    $("#buttons").on("click",".show-btn" ,function() {
        var showTitle = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +  
        showTitle + "&api_key=XMURnZ3OoF95QSk4UBKxQZDovuBdbrOz&limit=10";
        console.log(showTitle);
        $.ajax({    
            url:queryURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(response);
            displayGifs(response);
        })
    });

    //When the submit button is clicked, a new button is created
    $("#new-button-submit").on("click", function() {
        var newButtonName = $("#new-button-field").val();
        newButton(newButtonName);
        $("#new-button-field").val("");
        console.log("New Button: " + newButtonName); 
    });



    //This function prints out the gifs into the gif-output div
    function displayGifs(giphyObject) {
        $("#gif-output").empty();
        console.log(    )
        for(var i = 0; i < giphyObject.data.length; i++) {
            var gifInfo = $("<div>").attr("data-gifID", i).attr("class","gif-thumb");   
            var gifThumb = $("<img>").attr("class", "gif-img").attr("src", giphyObject.data[i].images.fixed_width_still.url).attr("data-state", "still").attr("data-still", giphyObject.data[i].images.fixed_width_still.url).attr("data-animate", giphyObject.data[i].images.fixed_width.url);
            
            console.log(gifThumb);
            var gifRating = giphyObject.data[i].rating;
            gifInfo.append(gifThumb);                                     
            gifInfo.append("Rating: " + gifRating);
            $("#gif-output").append(gifInfo);
        }
    }
    
    //Creating a new button and pushing to the end of topics array
    function newButton(buttonTitle) {
        topics.push(buttonTitle);
        var showButton = $("<button>").text(buttonTitle).attr("class", "btn btn-default show-btn").attr("data-name", buttonTitle);
        showButton.attr("type", "button");
        $("#buttons").append(showButton);
    }

    $("#gif-output").on("click" , ".gif-img" ,function() {
        var state = $(this).attr("data-state");
        console.log(state, this);
        if(state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    })
})