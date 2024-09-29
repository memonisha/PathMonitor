const video = document.getElementById('video');

// Access the camera and stream the video
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("Error accessing the camera: ", err);
    alert("Unable to access the camera.");
  });
