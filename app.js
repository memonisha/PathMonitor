/*
const video = document.getElementById('video');

// Access the user's camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error('Error accessing the camera: ', err);
  });

*/


// Initialize the map using Leaflet.js
const map = L.map('map').setView([51.505, -0.09], 13);  // Default to London

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker to the map for the user's location
let marker = L.marker([51.505, -0.09]).addTo(map).bindPopup('Your Location').openPopup();

// Watch the user's position and update the map
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(position => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    // Set the map center to the user's current location
    map.setView([lat, lng], 13);
    marker.setLatLng([lat, lng]).bindPopup('You are here!').openPopup();

    // Set destination coordinates (change these values as needed)
    const destination = [51.515, -0.1]; // Example destination

    // Fetch directions from OSRM
    fetch(`https://router.project-osrm.org/route/v1/driving/${lng},${lat};${destination[1]},${destination[0]}?overview=false&steps=true`)
      .then(response => response.json())
      .then(data => {
        const steps = data.routes[0].legs[0].steps;
        let directionsHTML = '<strong>Directions:</strong><br>';
        steps.forEach(step => {
          directionsHTML += step.maneuver.instruction + '<br>';
        });
        document.getElementById('directions').innerHTML = directionsHTML;
      })
      .catch(err => console.error(err));
  }, 
  error => {
    alert("Unable to retrieve your location.");
  });
} else {
  alert("Geolocation is not supported by this browser.");
}
