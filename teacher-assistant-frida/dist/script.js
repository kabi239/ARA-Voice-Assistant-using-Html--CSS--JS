function openYoutube() {
  window.open("https://www.youtube.com");
}
function openGmail() {
  window.open("https://mail.google.com/mail/u/0/#inbox");
}
function runSpeechRecognition() {
  const frida = document.querySelector("#frida");
  const texto = document.querySelector("#output");

  // new speech recognition object in Spanish!
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  // This runs when the speech recognition service starts
  recognition.onstart = function () {
    frida.classList.add("listening");
  };

  // stop listenting the speech recognition
  recognition.onspeechend = function () {
    recognition.stop();
  }

  // This runs when the speech recognition service returns result
  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.toLowerCase();
    const confidence = event.results[0][0].confidence;

    let textToSpeak = "Sorry. I did not understand.";

    // only run the special sentences if confidence is "high"
    if (confidence > 0.75) {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const meses = ["January", "Feb", "March", "April", "May", "June", "july", "August", "September", "October", "November", "December"];
      const d = new Date();

      if ((transcript.indexOf(" day") > -1 || transcript.indexOf(" day") > -1) && transcript.indexOf(" today") > -1) {
        textToSpeak = `today is ${dias[d.getDay()]}`;
      } else if ((transcript.indexOf(" day") > -1 || transcript.indexOf(" day") > -1) && transcript.indexOf(" morning") > -1) {
        const n = d.getDay();
        textToSpeak = `Tomorrow will be ${dias[(n + 1) % 7]}`;
      } else if (transcript.indexOf("hour") > -1) {
        let hour = d.getHours();
        if (hour > 12) hour -= 12;
        if (hour === 0) hour = 12;
        const minutes = d.getMinutes();
        let textMinutes = `y ${minutes} minutes`;
        if (minutes === 0) { textMinutes = "o'clock"; }
        if (minutes === 1) { textMinutes = "and 1 minute"; }
        if (minutes === 15) { textMinutes = "and a quarter"; }
        if (minutes === 30) { textMinutes = "and a half"; }
        textToSpeak = `Are the ${hour} ${textMinutes}`;
      } else if (transcript.indexOf(" date") > -1 && transcript.indexOf(" today") > -1) {
        textToSpeak = `today is ${d.getDate()} th of ${meses[d.getMonth()]}`;
      } else if (transcript=="what day is tommorow" ) {
        d.setDate(d.getDate() + 1)
        textToSpeak = `Tomorrow will be ${d.getDate()} of ${meses[d.getMonth()]}`;
      } else if (transcript.indexOf(" better") > -1 && transcript.indexOf(" teacher") > -1) {
        textToSpeak = `Jill Montoro is the best teacher`;
      } else if (transcript == "what day it is") {
        textToSpeak = `today is ${d.getDate()}th of ${meses[d.getMonth()]}`;
      } else if (transcript==="what is your name" ) {
        textToSpeak = "My name is ARA. "
      } else if ((transcript.indexOf("What") > -1 || transcript.indexOf("What") > -1) && (transcript.indexOf("these") > -1 || transcript.indexOf("these"))) {
        textToSpeak = "I'm good and you?"
      }else if (transcript == "open youtube") {
        openYoutube();
      }
      else if (transcript === "open gmail") {
        openGmail();
      }
      else if(transcript == "can you translate"){
          
      }
    }
    // show the closed captioned and remove after 3 seconds
    texto.textContent = textToSpeak;
    setTimeout(function () {
      texto.textContent = "";
    }, 3000)
    // read out loud the answer
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
    speech.text = textToSpeak;
    speech.onend = function (event) {
      console.log(event.elapsedTime);
      setTimeout(function () {
        frida.classList.remove("speaking");
      }, 600 - (event.elapsedTime % 600));
    }
    frida.classList.remove("listening");
    frida.classList.add("speaking");
    window.speechSynthesis.speak(speech);
  };
  // start recognition
  recognition.start();
}