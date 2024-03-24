                                                        // Stopwatch

let startTime = 0;  
let running = false;
let elapsed = 0;
let timer;

function startStopwatch() {
  if (!running) {
    startTime = Date.now() - elapsed;
    running = true;
    tick();
  }
}

function stopStopwatch() {
  if (running) {
    running = false;
    clearTimeout(timer);
  }
}

function resetStopwatch() {
  elapsed = 0;
  if (running) {
    startTime = Date.now();
  } else {
    startTime = 0;
  }
  updateDisplay();
}

function tick() {
  if (running) {
    elapsed = Date.now() - startTime;
    updateDisplay();
    timer = setTimeout(tick, 10);
  }
}

function updateDisplay() {
  const totalMilliseconds = elapsed;
  const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);
  const seconds = Math.floor((totalMilliseconds / 1000) % 60);
  const minutes = Math.floor((totalMilliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((totalMilliseconds / (1000 * 60 * 60)) % 24);

  const formatTimeUnit = (unit) => (unit < 10 ? `0${unit}` : unit.toString());

  const display = document.getElementById('display');
  display.textContent = `${formatTimeUnit(hours)}:${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}.${formatTimeUnit(milliseconds)}`;
}


                                                          //API Geo Location

document.getElementById('getLocationBtn').addEventListener('click', getLocation);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const accuracy = position.coords.accuracy;

  document.getElementById('locationInfo').innerHTML = `
    <p>Your current location:</p>
    <p>Latitude: ${latitude}</p>
    <p>Longitude: ${longitude}</p>
    <p>Accuracy: ${accuracy} meters</p>
  `;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert('User denied the request for Geolocation.');
      break;
    case error.POSITION_UNAVAILABLE:
      alert('Location information is unavailable.');
      break;
    case error.TIMEOUT:
      alert('The request to get user location timed out.');
      break;
    case error.UNKNOWN_ERROR:
      alert('An unknown error occurred.');
      break;
  }
}

                                    // Web Worker Counter

let w;

function timedCount() {
  i ++;
  postMessage(i);
  setTimeout("timedCount()",500);
}

timedCount();

function startWorker() {
  if(typeof(w) == "undefined") {
    w = new Worker("demo_workers.js");
  }
  w.onmessage = function(event) {
    document.getElementById("result").innerHTML = event.data;
  };
}

function stopWorker() { 
  w.terminate();
  w = undefined;
}


                                             // Javascript Validation

function myFunction() {
  const inpObj = document.getElementById("id1");
  if (!inpObj.checkValidity()) {
    document.getElementById("demo").innerHTML = inpObj.validationMessage;
  } else {
    document.getElementById("demo").innerHTML = "Input OK";
  } 
} 
                                                                   
                  