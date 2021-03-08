const map = L.map("mapid");

// PAUSE bis :35

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
// 	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	subdomains: 'abcd',
// 	minZoom: 1,
// 	maxZoom: 16,
// 	ext: 'jpg'
// }).addTo(map);

L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}",
    {
        attribution:
            'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: "abcd",
        minZoom: 0,
        maxZoom: 20,
        ext: "png"
    }
).addTo(map);

let polyline = L.polyline([], { color: "red" }).addTo(map);
let lastPosition;
let totalDistance = 0;

// create line
navigator.geolocation.watchPosition(onNewPosition, onError, {
    enableHighAccuracy: true
});

// on new geo location
function onNewPosition(data) {
    let lat = data.coords.latitude;
    let lon = data.coords.longitude;

    console.log("lat, lon:", lat, lon);

    // set map to current location
    map.setView([lat, lon], 13);

    // set marker
    L.marker([lat, lon]).addTo(map);

    // draw line
    let pos = L.latLng(lat, lon);
    polyline.addLatLng(pos);

    // show lat/lon in html
    document.querySelector("#lat").innerText = Math.round(lat * 100) / 100;
    document.querySelector("#lon").innerText = Math.round(lon * 100) / 100;

    // add to distance
    if (lastPosition) {
        totalDistance += pos.distanceTo(lastPosition);
        console.log('distance:', totalDistance);
        document.querySelector("#distance").innerText = Math.round(totalDistance);
    }
    lastPosition = pos;
}

function onError(error) {
    console.error(error);
}
