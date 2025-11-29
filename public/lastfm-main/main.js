// get your own last.fm api key from https://www.last.fm/api/account/create
const LASTFM_API_KEY = "526f9f87b5c3ddb8bd0c86ed9b8c65e5"
const username = "SternumSteven" // change username here
const url = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&format=json&extended=true&api_key=" + LASTFM_API_KEY + "&limit=1&user=" + username

// make API call
function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
	xmlHttp.send(null);
	return xmlHttp.responseText;
}

// converts unix time to relative time text (eg. 2 hours ago)
function relativeTime(time, time_text) {
    var time_now = Math.round(Date.now() / 1000)
    var time_diff = time_now - time

    let SEC_IN_MIN = 60
    let SEC_IN_HOUR = SEC_IN_MIN * 60
    let SEC_IN_DAY = SEC_IN_HOUR * 24

    if (time_diff < SEC_IN_HOUR) {
        let minutes = Math.round(time_diff / SEC_IN_MIN)
        return minutes + " minuto" +
            ((minutes != 1) ? "s" : "") + " atrás"
    }
    if (time_diff >= SEC_IN_HOUR && time_diff < SEC_IN_DAY) {
        let hours = Math.round(time_diff / SEC_IN_HOUR)
        return hours + " hora" +
            ((hours != 1) ? "s" : "") + " atrás"
    }
    if (time_diff >= SEC_IN_DAY)
        return time_text
}

var json = JSON.parse(httpGet(url));
var last_track = json.recenttracks.track[0]
var track = last_track.name
var trackLink = last_track.url
var artistLink = last_track.artist.url
var artist = last_track.artist.name
let relative_time = null
if (last_track.date) {
    var unix_date = last_track.date.uts
    var date_text = last_track.date["#text"]
    relative_time = relativeTime(unix_date, date_text)
}
var now_playing = (last_track["@attr"] == undefined) ? false : true
var imageLink = last_track.image[1]["#text"]
var loved = last_track.loved == "1"

trackElem = document.getElementById('track')
artistElem = document.getElementById('artist')
dateElem = document.getElementById('date')
nowplayingElem = document.getElementById('now-playing')
albumcoverElem = document.getElementById('album-cover')

trackLinkElem = document.createElement('a')
trackLinkElem.id = "track"
trackLinkElem.href = trackLink
trackLinkElem.target = "_blank"
trackLinkElem.textContent = track

artistLinkElem = document.createElement('a')
artistLinkElem.id = 'artist'
artistLinkElem.href = artistLink
artistLinkElem.target = "_blank"
artistLinkElem.textContent = artist

heartSpan = document.createElement('span')
heartSpan.id = 'heart'
heartSpan.textContent = loved ? "❤️" : ""

userLinkElem = document.createElement('a')
userLinkElem.href = "https://www.last.fm/pt/user/" + username
userLinkElem.target = "_blank"
userLinkElem.textContent = (relative_time != null) ? relative_time : "Tocando agora..."

trackElem.appendChild(trackLinkElem)
trackElem.appendChild(heartSpan)
artistElem.appendChild(artistLinkElem)
dateElem.appendChild(userLinkElem)
albumcoverElem.src = imageLink

console.log(
    "Artista: " + artist + "\n" +
    "Faixa: " + track + "\n" +
    "Data: " + relative_time + "\n" +
    "Tocando: " + now_playing + "\n" +
    "Curtida: " + loved)
