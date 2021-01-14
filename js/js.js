//Removed API key and secret for upload to github
var apiKey = '';
var secret = '';
var urlBase = 'https://ws.audioscrobbler.com/2.0/'

function getInfo(){
    document.getElementById("songsTitle").style.visibility = "visible";
    document.getElementById("horzLineSongs").style.visibility = "visible";
    document.getElementById("info").style.visibility = "visible";
    //Create a request var and assign a new XMLHttpRequest object
    var request = new XMLHttpRequest()
    //Get the artist's name from the input box
    var artistName = document.getElementById("ArtistName").value;
    //The url to search the API for the info we need
    url = urlBase + '?method=artist.getInfo&artist=' + artistName + '&api_key=' + apiKey + '&format=json'
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', url, true)
    request.onload = function () {
        var data = JSON.parse(this.response)
        //Try to get the artists bio
        try {
            var aTagCounter = data.artist.bio.content.length;
        //Catch a Uncaught TypeError and display a error message
        }catch (error){
            //Try to remove a p tag if it's there
            try{
                //Find element bio
                var bio = document.getElementById("bio");
                //Remove the bio from the infoBox div (parent)
                bio.parentNode.removeChild(bio);
                //Create p tag
                var pTag = document.createElement('p');
                pTag.className = "lead";
                //Add id "bio"
                pTag.id = "bio";
                //Add error message
                pTag.append("An error has occured in your search. Please try again.");
                //Append this child to the infoBox div
                document.getElementById('infoBox').appendChild(pTag);
            //If no other p tag, execute this catch
            }catch{
                //Create p tag
                var pTag = document.createElement('p');
                pTag.className = "lead";
                //Add id "bio"
                pTag.id = "bio";
                //Add error message
                pTag.append("An error has occured in your search.");
                //Append this child to the infoBox div
                document.getElementById('infoBox').appendChild(pTag);
            }
        }

        //This for loop counts how many characters
        //Before useless information shows up
        for (i= 0; i<data.artist.bio.content.length; i++){
            if (data.artist.bio.content[i]=='<'){
                break;
            }
            aTagCounter = aTagCounter - 1;
        }

        //test holds the bio of the artist
        var text = data.artist.bio.content;
        //Created a couter to check how many characters should be kept
        var lengthCounter = 0;
        //This gets rid of the usless information counted before
        text = text.substring(0, text.length - aTagCounter);
        if (text.length>500){
            for (i = 0; i < text.length; i++){
                lengthCounter = lengthCounter + 1;
                //Ends the couter once it's greater than 500 and is on a '.'
                if (lengthCounter>500 && text[i]=="."){
                    break;
                }
            }
            //Subtract the char count from the amount of characters
            difference = text.length - lengthCounter;
            //Subtract that from total length to trim to a little bit 
            //more than 500 Characters so that the bio ends on a period
            text = text.substring(0, text.length - difference);
        }

        //Try to remove a p tag if it's there
        try {
            //Find element bio
            var bio = document.getElementById("bio");
            //Remove the bio from the infoBox div (parent)
            bio.parentNode.removeChild(bio);
            //Create p tag
            var pTag = document.createElement('p');
            pTag.className = "lead";
            //Add id "bio"
            pTag.id = "bio";
            //Add the bio to the p tag so info is displayed
            if (text == "" || text == " ") {
                pTag.append("An error has occured in your search. The information below may be incorrect.");
            }
            if (text != "" || text != " ") {
                pTag.append(text);
            }
            //Append this child to the infoBox div
            document.getElementById('infoBox').appendChild(pTag);
        //If no other p tag, execute this catch
        } catch (error){
            //Create p tag
            var pTag = document.createElement('p');
            pTag.className = "lead";
            //Add id "bio"
            pTag.id = "bio";
            //Add the bio to the p tag so info is displayed
            if (text == "" || text == " ") {
                pTag.append("An error has occured in your search. The information below may be incorrect.");
            }
            if (text != "" || text != " ") {
                pTag.append(text);
            }
            //Append this child to the infoBox div
            document.getElementById('infoBox').appendChild(pTag);
        }
    }
    // Send request
    request.send()
    getSongs()
}

function getSongs(){
    //Create a request var and assign a new XMLHttpRequest object
    var request = new XMLHttpRequest()
    //Gets the artists name from the input box
    artistName = document.getElementById("ArtistName").value;
    //Builds the url to access the API
    url = urlBase + '?method=artist.gettoptracks&artist=' + artistName + '&api_key=' + apiKey + '&format=json'
    //Opens a GET request with the url
    request.open('GET', url, true)
    request.onload = function () {
        //Parses the JSON data into data var
        try{
            //Get the div that holds all the songs
            var container = document.getElementById("songContainer");
            var elements = container.getElementsByClassName("hoverEffect");
            while (elements[0]) {
                //Remove the song from the songContainer div (parent)
                elements[0].parentNode.removeChild(elements[0]);
            }
            var data = JSON.parse(this.response)
            //Holds all the song info in the array var
            var array = data.toptracks.track;
            //Iterates through the array to get all the song names
            for (i=0; i<array.length; i++){
                //Create a div element to hold the song
                var songBox = document.createElement('div');
                songBox.className = "hoverEffect col";
                songBox.id = "song" + i;
                //Create a p tag to hold song name
                var songName = document.createElement('p');
                songName.className = "lead";
                songName.id = "songName" + i;
                songName.append(array[i].name);
                songBox.appendChild(songName);
                document.getElementById('songContainer').appendChild(songBox);
            }
        } catch(error){
            var data = JSON.parse(this.response)
            //Holds all the song info in the array var
            var array = data.toptracks.track;
            //Iterates through the array to get all the song names
            for (i=0; i<array.length; i++){
                //Create a div element to hold the song
                var songBox = document.createElement('div');
                songBox.className = "hoverEffect col";
                songBox.id = "song" + i;
                //Create a p tag to hold song name
                var songName = document.createElement('p');
                songName.className = "lead";
                songName.id = "songName" + i;
                songName.append(array[i].name);
                songBox.appendChild(songName);
                document.getElementById('songContainer').appendChild(songBox);
            }
        }
    }
    request.send()
    document.getElementById("songContainer").addEventListener("click", getSongName);
}

function getSongName(event){
    var eventName = event.target.id;
    var songTitle;
    if (eventName.length <= 6){
        songTitle = document.getElementById(eventName).firstElementChild.innerHTML;
    }
    if (eventName.length>6){
        songTitle = document.getElementById(eventName).innerHTML;
    }
    var artistName = document.getElementById("ArtistName").value;
    localStorage.setItem("Artist", artistName);
    localStorage.setItem("songName", songTitle);
    window.location.href="lyrics.html"
}