
var artistName = localStorage.getItem('Artist');
var songName = localStorage.getItem('songName');
var request = new XMLHttpRequest()
url = "https://api.lyrics.ovh/v1/" + artistName+ "/" + songName
request.open('GET', url, true)
request.onload = function () {
    try{
        var data = JSON.parse(this.response)
    }catch(error){
        document.write("<h1>404 (Not Found)</h1>");
    }
    var lyrics = data.lyrics;
    try{
        checkBlank(lyrics);
        for (i=0; i<lyrics.length; i++){
            if (lyrics[i] == "\n"){
                lyrics = lyrics.replace("\n", "<br>");
            }
        }
        document.getElementById('songTitle').innerHTML = songName;
        document.getElementById('songLyrics').innerHTML = lyrics;
        console.log(lyrics);
    }catch(e){
        document.getElementById('songLyrics').innerHTML = ("<h1>404 (Not Found)</h1>");
    }
}
request.send()

function checkBlank(theLyrics){
    if (theLyrics == ""){
        throw "Error";
    }
    return 0;
}